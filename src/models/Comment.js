const { DataTypes } = require("@sequelize/core");
const sequelize = require("../utils/sequelize");
const Post = require("./Post");

const Comment = sequelize.define("Comment", {
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Post, 
      key: "id",
    },
    onDelete: "CASCADE",
  },
});

Comment.belongsTo(Post, {
  foreignKey: "postId",
});

module.exports = Comment;
