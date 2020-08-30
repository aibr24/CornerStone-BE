const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Profile extends Model {}

Profile.init(
  {
    bio: {
      type: DataTypes.STRING,
      allowNull: false, // REVIEW: this is unnecessary
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
  }
);

module.exports = Profile;
