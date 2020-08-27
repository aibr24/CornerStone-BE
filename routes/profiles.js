const express = require("express");
const router = express.Router();
const passport = require("passport");
const upload = require("../middleware/multer");
const {
  profileUpdate,
  fetchProfile,
} = require("../controllers/profileController");

// Param
router.param("profileId", async (req, res, next, profileId) => {
  const profile = await fetchProfile(profileId, next);
  if (profile) {
    req.profile = profile;
    next();
  } else {
    const err = new Error("Profile Not Found");
    err.status = 404;
    next(err);
  }
});

// UpdateProfile
router.put(
  "/:profileId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  profileUpdate
);

module.exports = router;
