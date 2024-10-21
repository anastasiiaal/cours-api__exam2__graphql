require("dotenv").config();
require("./src/utils/sequelize.js");

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { resolvers } = require("./src/graphql/resolvers");
const { typeDefs } = require("./src/graphql/typeDefs.js");

const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, {
  listen: { port: 8081 },
}).then(({ url }) => {
  console.log(`Running ${url}`);
});
