const gql = require("graphql-tag");

const typeDefs = gql`
  type Query {
    users: [User]
    user(id: ID): User
  }

  type User {
    id: ID
    firstName: String
    lastName: String
    age: Int
    posts: [Post]
  }

  type Post {
    id: ID
    text: String
  }

  type Mutation {
    createUser(firstName: String, lastName: String, age: Int): User
    createPost(text: String, userId: ID): Post
    deleteUser(id: ID): User
  }
`;

module.exports = { typeDefs };
