const User = require("./User");
const Trip = require("./Trip");
const Profile = require("./Profile");
const Comment = require("./Comment");

User.hasMany(Trip, { as: "trips", foreignKey: "userId" });
User.hasMany(Profile, { as: "profile", foreignKey: "userId" });

Trip.hasMany(Comment, { as: "comments", foreignKey: "tripId" });
Comment.belongsTo(Trip, { as: "trip" });
Trip.belongsTo(User, { as: "user" });
Profile.belongsTo(User, { as: "user" });

module.exports = {
  User,
  Trip,
  Profile,
  Comment,
};
