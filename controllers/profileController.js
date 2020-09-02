const Profile = require("../db/models/Profile");
const User = require("../db/models/User");

// List
exports.profileList = async (req, res, next) => {
  try {
    const profiles = await Profile.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: User,
        as: "user",
        attributes: ["username"],
      },
    });
    res.json(profiles);
  } catch (error) {
    next(error);
  }
};

// updateProfile
exports.profileUpdate = async (req, res, next) => {
  try {
    const profile = await Profile.findByPk(req.user.id);
    await profile.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
