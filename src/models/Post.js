const { DataTypes } = require("@sequelize/core");
const sequelize = require("../utils/sequelize");
const User = require("./User");

const Post = sequelize.define("Post", {
  // Model attributes are defined here
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Post.belongsTo(User);

module.exports = Post;
