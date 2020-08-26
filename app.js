const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db/db");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");

// Routes
const userRoutes = require("./routes/users");
const tripRoutes = require("./routes/trips");

// Express instance
const app = express();

app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

// This function and its call below (line 30) feel awkward being here.
// Maybe move to them to above `const PORT = ...`?
const run = async () => {
  try {
    await db.sync({ alter: true });
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();

app.use(cors());
app.use(bodyParser.json());

// Routers use
app.use(userRoutes);
app.use("/trips", tripRoutes);

// Error Handeling MiddleWare
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "internal Server Error",
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`The application is running on localhost:${PORT}`);
});
