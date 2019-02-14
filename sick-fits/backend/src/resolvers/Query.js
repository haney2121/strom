const { forwardTo } = require("prisma-binding");
const { hasPermission } = require("../utils");

const Query = {
  projects: forwardTo("db"), //easy direct query to db, useable if no middleware is needed.
  project: forwardTo("db"),
  projectsConnection: forwardTo("db"),

  me(parent, args, ctx, info) {
    //check if user has ID
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user({ where: { id: ctx.request.userId } }, info);
  },
  async users(parent, args, ctx, info) {
    //user is logged in
    if (!ctx.request.userId) {
      throw new Error("You must be logged in!");
    }
    //permission to query users
    hasPermission(ctx.request.user, ["ADMIN", "PERMISSIONUPDATE"]);
    //query users
    return ctx.db.query.users({}, info);
  }
};

module.exports = Query;
