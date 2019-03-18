const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { randomBytes } = require("crypto");
const { promisify } = require("util");
const { makeEmail, transport } = require("../mail");
const { hasPermission } = require("../utils");

const Mutations = {
  async createProject(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error("You must be logged in to do that!");
    }
    const project = await ctx.db.mutation.createProject(
      {
        data: {
          //creating relationship with project and user
          createdBy: {
            connect: {
              id: ctx.request.userId
            }
          },
          ...args
        }
      },
      info
    );
    return project;
  },
  updateProject(parent, args, ctx, info) {
    //copy of updates
    const updates = { ...args };
    //remove id from the updates
    delete updates.id;
    //run the update method
    return ctx.db.mutation.updateProject(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async deleteProject(parent, args, ctx, info) {
    const where = { id: args.id };
    //find the project
    const project = await ctx.db.query.project(
      { where },
      `{id name createdBy {id}}`
    );
    //owner of project/permissions
    const ownsProject = project.createdBy.id === ctx.request.userId;
    const hasPermissions = ctx.request.user.permissions.some(permission =>
      ["ADMIN", "DELETE"].includes(permission)
    );
    if (ownsProject || hasPermissions) {
    } else {
      throw new Error("You are not allowed to delete that!");
    }
    //delete project
    return ctx.db.mutation.deleteProject({ where }, info);
  },
  async signup(parent, args, ctx, info) {
    //lowercase email
    args.email = args.email.toLowerCase();
    //hash password
    const password = await bcrypt.hash(args.password, 10);
    //create user in db - ...args is spreading all data put in. name: args.name etc
    const user = await ctx.db.mutation.createUser(
      { data: { ...args, password, permissions: { set: ["USER"] } } },
      info
    );
    //create jwt token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    //set jwt as a cookie on the res
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });
    //return user to browser
    return user;
  },
  async signin(parent, { email, password }, ctx, info) {
    //1. check user with email
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No User found with ${email}`);
    }
    //2. check if password is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error(`Invalid Password`);
    }
    //3. generate jwt
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    //4. set cookie
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });
    //5. return user
    return user;
  },
  signout(parent, args, ctx, info) {
    ctx.response.clearCookie("token");
    return { message: "Goodbye!" };
  },
  async requestReset(parent, args, ctx, info) {
    //check user to db
    const user = await ctx.db.query.user({ where: { email: args.email } });
    if (!user) {
      throw new Error(`No user found for ${args.email}`);
    }
    //set reset token and expiry to the user
    const randomBytesPromisified = promisify(randomBytes);
    const resetToken = (await randomBytesPromisified(20)).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000;
    const res = await ctx.db.mutation.updateUser({
      where: { email: args.email },
      data: { resetToken, resetTokenExpiry }
    });
    //email the reset token
    const mailRes = await transport.sendMail({
      from: process.env.MAIL_USER,
      to: user.email,
      subject: "Password Reset Link",
      html: makeEmail(
        `Your password reset token is here! \n\n <a href="${
          process.env.FRONTEND_URL
        }/reset?resetToken=${resetToken}">Click here to reset</a>`
      )
    });

    return { message: "Email will be sent soon" };
  },
  async resetPassword(parent, args, ctx, info) {
    //do passwords match
    if (args.password !== args.confirmPassword) {
      throw new Error("Password must match");
    }
    //legit token?
    //check if expired
    const [user] = await ctx.db.query.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now() - 3600000
      }
    });
    if (!user) {
      throw new Error("This token has expired or is invalid!");
    }
    //hash new password
    const password = await bcrypt.hash(args.password, 10);
    //save new password to user and remove reset fields
    const updatedUser = await ctx.db.mutation.updateUser({
      where: { email: user.email },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null
      }
    });
    //generate jwt
    const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
    //set jwt cookie
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });
    //return user
    return updatedUser;
  },
  async updatePermissions(parent, args, ctx, info) {
    //check if logged in
    if (!ctx.request.userId) {
      throw new Error("You must be logged in!");
    }
    //query current user
    const currentUser = await ctx.db.query.user(
      {
        where: {
          id: ctx.request.userId
        }
      },
      info
    );
    //check if they have permission to query
    hasPermission(currentUser, ["ADMIN", "PERMISSIONUPDATE"]);
    //update the permissions
    return ctx.db.mutation.updateUser(
      {
        data: {
          permissions: {
            set: args.permissions
          }
        },
        where: {
          id: args.userId
        }
      },
      info
    );
  }
};

module.exports = Mutations;
