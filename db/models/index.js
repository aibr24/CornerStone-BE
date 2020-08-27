const User = require("./User");
const Trip = require("./Trip");
const Profile = require("./Profile");

User.hasMany(Trip, { as: "trips", foreignKey: "userId" });
User.hasMany(Profile, { as: "profile", foreignKey: "userId" });

Trip.belongsTo(User, { as: "user" });
Profile.belongsTo(User, { as: "user" });

module.exports = {
  User,
  Trip,
  Profile,
};
