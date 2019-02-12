const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Mutations = {
  async createProject(parent, args, ctx, info) {
    const project = await ctx.db.mutation.createProject(
      {
        data: {
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
    const project = await ctx.db.query.project({ where }, `{id name}`);
    //owner of project/permissions
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
  }
};

module.exports = Mutations;
