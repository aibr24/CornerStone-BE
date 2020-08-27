const { Sequelize } = require("sequelize");

const db = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      logging: false,
    })
  : new Sequelize({
      username: "postgres",
      database: "cornerstone",
      dialect: "postgres",
      host: "localhost",
      logging: false,
    });

module.exports = db;
