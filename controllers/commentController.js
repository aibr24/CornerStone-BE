const Comment = require("../db/models/Comment.js");
const Trip = require("../db/models/Trip.js");

// Fetch
exports.fetchComment = async (commentId, next) => {
  try {
    const comment = await Comment.findByPk(commentId, {
      include: {
        model: Trip,
        as: "trip",
        attributes: ["title"],
      },
    });
    return comment;
  } catch (error) {
    next(error);
  }
};

// List
exports.commentList = async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Trip,
          as: "trip",
          attributes: ["title"],
        },
      ],
    });
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

exports.commentUpdate = async (req, res, next) => {
  try {
    await req.comment.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
