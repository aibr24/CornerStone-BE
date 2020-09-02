const Profile = require("../db/models/Profile");
const User = require("../db/models/User");

// Fetch
exports.fetchProfile = async (profileId, next) => {
  try {
    const profile = await Profile.findByPk(profileId);
    console.log(profile);
    return profile;
  } catch (error) {
    next(error);
  }
};

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
    const { profile } = req;
    // REVIEW: You don't need to check if `req.user` exists or not. If it doesn't exist jwt strategy won't allow it to reach the controller. I believe I've mentioned this before 🤔
    if (req.user && req.user.id === profile.userId) {
      // REVIEW: You de-structured req.profile above, why are you not using the de-structured one?
      await req.profile.update(req.body);
      res.status(204).end();
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};
