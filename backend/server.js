const { ApolloServer } = require("apollo-server");
const connectDB = require("./config/db");

const typeDefs = require("./graphql/typeDefs");

const resolvers = require("./graphql/resolvers/index");

const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => ({ req }) });
connectDB().then((res) => {
  server.listen({ port: process.env.PORT ? process.env.PORT : 5000 }).then((res) => {
    console.log(` Server running at Port ${res.url}`);
  });
});
