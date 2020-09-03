const express = require("express");
const router = express.Router();
const {
  fetchComment,
  commentList,
  commentUpdate,
} = require("../controllers/commentController");

// CommentList
router.get("/", commentList);

// CommentParam
router.param("commentId", async (req, res, next, commentId) => {
  const comment = await fetchComment(commentId, next);
  if (comment) {
    req.comment = comment;
    next();
  } else {
    const err = new Error("Comment Not Found");
    err.status = 404;
    next(err);
  }
});
// CommentUpdate
router.put("/:commentId", commentUpdate);

module.exports = router;
