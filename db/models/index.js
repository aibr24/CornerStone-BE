const User = require("./User");
const Trip = require("./Trip");
const Profile = require("./Profile");

User.hasMany(Trip, { as: "trips", foreignKey: "userId" });
// REVIEW: User has many Profiles?????????????????????? Oh God!! I'm dying here!!!! HELP!!!
User.hasMany(Profile, { as: "profile", foreignKey: "userId" });

Trip.belongsTo(User, { as: "user" });
Profile.belongsTo(User, { as: "user" });

// REVIEW: to keep your relations organized, keep every relation under each other, mathalan user has many trips, under it trip belongs to user

module.exports = {
  User,
  Trip,
  Profile,
};
