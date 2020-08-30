const Profile = require("../db/models/Profile");
const User = require("../db/models/User");
// Fetch
exports.fetchProfile = async (profileId, next) => {
  try {
    const profile = await Profile.findByPk(profileId);
    // REVIEW: remove console logs if done testing
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
    // REVIEW: You don't need to check if req.user exists, this is the job of jwt strategy, if it doesn't exist the request will return 401 and it will never reach the controller.
    // بدال لا تطرش نقصات وتشيلني من اللستة بكيفك ركز شوي
    if (req.user && req.user.id === profile.userId) {
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
