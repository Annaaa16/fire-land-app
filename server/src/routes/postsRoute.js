const express = require('express');

const verifyTokens = require('../middlewares/authMiddleware');
const verifyMongooseId = require('../middlewares/mongooseMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const postsController = require('../controllers/postsController');
const verifyQueries = require('../middlewares/queriesMiddleware');

const router = express.Router();

// @route POST /api/posts/create
// @desc Create new post
// @access Private
router.post(
  '/create',
  verifyTokens,
  upload.single('file'),
  postsController.createPost
);

// @route GET /api/posts?page=...&limit=...
// @desc Get all posts or limit posts
// @access Private
router.get('/', verifyTokens, verifyQueries, postsController.getPosts);

// @route PUT /api/posts/:postId
// @desc Update post
// @access Private
router.put(
  '/:postId',
  verifyTokens,
  verifyMongooseId,
  upload.single('file'),
  postsController.updatePost
);

// @route DELETE /api/posts/:userId
// @desc Delete post
// @access Private
router.delete(
  '/:postId',
  verifyTokens,
  verifyMongooseId,
  postsController.deletePost
);

// @route PATCH /api/posts/:userId/reactions
// @desc React or unreact to a post
// @access Private
router.patch(
  '/:postId/reactions',
  verifyTokens,
  verifyMongooseId,
  postsController.reactPost
);

module.exports = router;
