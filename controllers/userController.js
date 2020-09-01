const { User, Profile } = require("../db/models/index.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");

exports.signup = async (req, res, next) => {
  const { password } = req.body;
  const saltedRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltedRounds);
    req.body.password = hashedPassword;
    //Creating User
    const newUser = await User.create(req.body);
    const payload = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      expires: Date.now() + JWT_EXPIRATION_MS,
    };

    //Generating Profile
    const newProfile = {
      userId: newUser.id,
      bio: "",
      image: "",
    };
    Profile.create(newProfile);
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res) => {
  const payload = {
    id: req.user.id,
    username: req.body.username,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    expires: Date.now() + parseInt(JWT_EXPIRATION_MS),
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};
