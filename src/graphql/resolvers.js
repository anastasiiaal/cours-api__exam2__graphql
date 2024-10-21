const User = require("../models/User.js");
const Post = require("../models/Post.js");

const resolvers = {
  Query: {
    users: async () => await User.findAll({}),
    user: async (parent, args) => {
      const user = await User.findByPk(args.id);
      let posts = [];

      try {
        posts = await Post.findAll({
          where: {
            userId: user.id,
          },
        });
        console.log(posts);
      } catch (e) {}

      return {
        ...user.toJSON(),
        posts,
      };
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      const { firstName, lastName, age } = args;
      const newUser = User.build({
        firstName,
        lastName,
        age,
      });
      await newUser.save();
      return newUser;
    },
    createPost: async (parent, args) => {
      const { text, userId } = args;
      const newPost = Post.build({
        text,
        userId: userId,
      });
      await newPost.save();
      return newPost;
    },
    deleteUser: async (parent, args) => {
      const { id } = args;
      const result = await User.destroy({
        where: {
          id,
        },
      });
      return result;
    },
  },
};

module.exports = { resolvers };
