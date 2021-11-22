const express = require('express');

const verifyToken = require('../middlewares/authMiddleware');
const verifyMongooseId = require('../middlewares/mongooseMiddleware');
const commentsController = require('../controllers/commentsController');

const router = express.Router();

// @route POST api/comments
// @desc Create new comment
// @access Private
router.post('/', verifyToken, commentsController.createComment);

// @route GET api/comments/:postId
// @desc Get comments of a post
// @access Private
router.post(
  '/:postId',
  verifyToken,
  verifyMongooseId,
  commentsController.getComments
);

module.exports = router;
