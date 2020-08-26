const { Sequelize } = require("sequelize");

const db = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      logging: false,
    })
  : new Sequelize({
      username: "postgres",
      password: "admin", // I recommend keeping the password and DB name empty when pushing, and when you pull you add the name and pw locally
      database: "cornerstone",
      dialect: "postgres",
      host: "localhost",
      logging: false,
    });

module.exports = db;
