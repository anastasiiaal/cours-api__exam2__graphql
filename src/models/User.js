const { DataTypes } = require("@sequelize/core");
const sequelize = require("../utils/sequelize");

const User = sequelize.define("User", {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.INTEGER,
  },
});

module.exports = User;
