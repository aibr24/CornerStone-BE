const { User, Vendor /* Vendor? */ } = require("../db/models/index.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");

exports.signup = async (req, res, next) => {
  const { password } = req.body;
  const saltedRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltedRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const payload = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      expires: Date.now() + JWT_EXPIRATION_MS,
    };
    console.log(req.body); // Remove console logs from master
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
  console.log(payload); // Remove console logs
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
  console.log(token); // this line never gets run, remove it
};
