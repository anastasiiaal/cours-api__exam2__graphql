const gql = require("graphql-tag");

const typeDefs = gql`
  type Query {
    posts(sort: String): [Post]
    post(id: ID!): Post
    comments(postId: ID!): [Comment]
    comment(id: ID!): Comment
  }

  type Post {
    id: ID
    author: String
    text: String
    url: String
    comments: [Comment]
    createdAt: String
  }

  type Comment {
    id: ID
    author: String
    content: String
    post: Post  # Each comment belongs to one post
    createdAt: String
  }

  type Mutation {
    createPost(author: String, text: String, url: String): Post
    createComment(author: String, content: String, postId: ID!): Comment
    deletePost(id: ID!): Post
  }
`;

module.exports = { typeDefs };
