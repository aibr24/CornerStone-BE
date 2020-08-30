const { Trip, User } = require("../db/models/index.js");

// Fetch
exports.fetchTrip = async (tripId, next) => {
  try {
    const trip = await Trip.findByPk(tripId, {
      include: {
        model: User,
        as: "user",
        attributes: ["username"],
      },
    });
    return trip;
  } catch (error) {
    next(error);
  }
};

// List
exports.tripList = async (req, res, next) => {
  try {
    const trips = await Trip.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: User,
        as: "user",
        attributes: ["username"],
      },
    });
    res.json(trips);
  } catch (error) {
    next(error);
  }
};

// Update
exports.tripUpdate = async (req, res, next) => {
  try {
    // REVIEW: You don't need to check if req.user exists, this is the job of jwt strategy, if it doesn't exist the request will return 401 and it will never reach the controller.
    if (req.user && req.user.id === req.trip.userId) {
      if (req.file) {
        req.body.image = `${process.env.PORT ? "https" : "http"}://${req.get(
          "host"
        )}/media/${req.file.filename}`;
      }
      await req.trip.update(req.body);
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

// TripDelete
exports.tripDelete = async (req, res, next) => {
  try {
    // REVIEW: You don't need to check if req.user exists, this is the job of jwt strategy, if it doesn't exist the request will return 401 and it will never reach the controller.
    if (req.user && req.user.id === req.trip.userId) {
      await req.trip.destroy();
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

// TripCreate
exports.tripCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${process.env.PORT ? "https" : "http"}://${req.get(
        "host"
      )}/media/${req.file.filename}`;
    }
    req.body.userId = req.user.id;
    const newTrip = await Trip.create(req.body);
    res.status(201).json(newTrip);
  } catch (error) {
    next(error);
  }
};
