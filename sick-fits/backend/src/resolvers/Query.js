const { forwardTo } = require("prisma-binding");

const Query = {
  projects: forwardTo("db"), //easy direct query to db, useable if no middleware is needed.
  project: forwardTo("db"),
  projectsConnection: forwardTo("db"),

  users: forwardTo("db"),
  me(parent, args, ctx, info) {
    //check if user has ID
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user({ where: { id: ctx.request.userId } }, info);
  }
};

module.exports = Query;
