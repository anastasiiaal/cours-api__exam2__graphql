const { Sequelize } = require("@sequelize/core");

const sequelize = new Sequelize({
  url: process.env.MYSQL_URL,
  dialect: "mysql",
}); // Example for postgres

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error(error);
  }
})();

module.exports = sequelize;
