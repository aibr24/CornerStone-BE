const express = require("express");
const router = express.Router();
const { signup, signin } = require("../controllers/userController");
const passport = require("passport");

//Signup
router.post("/signup", signup);

//Signin
router.post(
    "/signin",
    passport.authenticate("local", { session: false }),
    signin
);


module.exports = router;