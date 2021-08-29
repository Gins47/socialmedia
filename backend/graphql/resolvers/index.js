const postsResolvers = require("./Posts");
const usersResolvers = require("./Users");

module.exports = {
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
  },
};
