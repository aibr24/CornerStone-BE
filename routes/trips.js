const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const passport = require("passport");

const {
  tripList,
  tripUpdate,
  tripDelete,
  fetchTrip,
  tripCreate,
  commentCreate,
} = require("../controllers/tripController");

// Param
router.param("tripId", async (req, res, next, tripId) => {
  const trip = await fetchTrip(tripId, next);
  if (trip) {
    req.trip = trip;
    next();
  } else {
    const err = new Error("Trip Not Found");
    err.status = 404;
    next(err);
  }
});

// TripList
router.get("/", tripList);

// TripUpdate
router.put(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  tripUpdate
);

// TripDelete
router.delete(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  tripDelete
);

// TripCreate
router.post("/", passport.authenticate("jwt", { session: false }), tripCreate);

// CommentCreate
router.post("/:tripId/comments", commentCreate);

module.exports = router;
