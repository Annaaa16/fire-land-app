const express = require('express');

const verifyTokens = require('../middlewares/authMiddleware');
const verifyMongooseId = require('../middlewares/mongooseMiddleware');
const commentsController = require('../controllers/commentsController');

const router = express.Router();

// @route POST api/comments/create
// @desc Create new comment
// @access Private
router.post('/create', verifyTokens, commentsController.createComment);

// @route GET api/comments/:postId
// @desc Get comments of a post
// @access Private
router.post(
  '/:postId',
  verifyTokens,
  verifyMongooseId,
  commentsController.getComments
);

module.exports = router;
