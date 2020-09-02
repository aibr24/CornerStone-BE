const express = require("express");
const router = express.Router();
const passport = require("passport");
const upload = require("../middleware/multer");
const {
  profileUpdate,
  profileList,
} = require("../controllers/profileController");

// List
router.get("/", profileList);

// UpdateProfile
// REVIEW: Do you need a profile ID? Every profile has a userId right? And since this route uses a jwt strategy, it receives `req.user`. So how can use `req.user` to update a profile? I want an answer to this in tomorrow's (2-Sept) standup meeting.
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  profileUpdate
);

module.exports = router;
