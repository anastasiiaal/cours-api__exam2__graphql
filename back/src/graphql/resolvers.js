const Comment = require("../models/Comment.js");
const Post = require("../models/Post.js");

const resolvers = {
  Query: {
    posts: async () => {
      return await Post.findAll();
    },
    post: async (parent, args) => {
      const post = await Post.findByPk(args.id, {
        include: [{ model: Comment, as: "comments" }]
      });
      return post;
    },
    comments: async (parent, args) => {
      return await Comment.findAll({
        where: {
          postId: args.postId,
        },
      });
    },
    comment: async (parent, args) => {
      return await Comment.findByPk(args.id);
    },
  },
  
  Mutation: {
    createPost: async (parent, args) => {
      const { author, text, url } = args;
      const newPost = Post.build({
        author,
        text,
        url,
      });
      await newPost.save();
      return newPost;
    },
    createComment: async (parent, args) => {
      const { author, content, postId } = args;
      const newComment = Comment.build({
        author,
        content,
        postId,
      });
      await newComment.save();
      return newComment;
    },
    deletePost: async (parent, args) => {
      const { id } = args;
      const post = await Post.findByPk(id);
      if (!post) {
        throw new Error("Post not found");
      }
      await post.destroy();
      return post;
    },
  },
};

module.exports = { resolvers };
