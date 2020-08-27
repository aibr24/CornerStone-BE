const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db/db");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");

// Routes
const userRoutes = require("./routes/users");
const tripRoutes = require("./routes/trips");
const profileRoutes = require("./routes/profiles");

// Express instance
const app = express();

app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use(cors());
app.use(bodyParser.json());

// Routers use
app.use(userRoutes);
app.use("/trips", tripRoutes);
app.use("/profile", profileRoutes);

// Error Handeling MiddleWare
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "internal Server Error",
  });
});

const run = async () => {
  try {
    await db.sync({ alter: true });
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`The application is running on localhost:${PORT}`);
});
