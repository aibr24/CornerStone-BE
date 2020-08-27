const Profile = require("../db/models/Profile");

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

// updateProfile
exports.profileUpdate = async (req, res, next) => {
  try {
    const { profile } = req;
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
