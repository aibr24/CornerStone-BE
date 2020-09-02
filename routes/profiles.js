const express = require("express");
const router = express.Router();
const passport = require("passport");
const upload = require("../middleware/multer");
const {
  profileUpdate,
  fetchProfile,
  profileList,
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

// List
router.get("/", profileList);

// UpdateProfile
// REVIEW: Do you need a profile ID? Every profile has a userId right? And since this route uses a jwt strategy, it receives `req.user`. So how can use `req.user` to update a profile? I want an answer to this in tomorrow's (2-Sept) standup meeting.
router.put(
  "/:profileId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  profileUpdate
);

module.exports = router;
