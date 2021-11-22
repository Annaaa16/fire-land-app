const express = require('express');

const verifyToken = require('../middlewares/authMiddleware');
const verifyMongooseId = require('../middlewares/mongooseMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const postsController = require('../controllers/postsController');

const router = express.Router();

// @route POST /api/posts/create
// @desc Create new post
// @access Private
router.post(
  '/create',
  verifyToken,
  upload.single('file'),
  postsController.createPost
);

// @route GET /api/posts?page=...&limit=...
// @desc Get all posts or limit posts
// @access Private
router.get('/', verifyToken, postsController.getPosts);

// @route PUT /api/posts/:id
// @desc Update post
// @access Private
router.put(
  '/:id',
  verifyToken,
  verifyMongooseId,
  upload.single('file'),
  postsController.updatePost
);

// @route DELETE /api/posts/:id
// @desc Delete post
// @access Private
router.delete(
  '/:id',
  verifyToken,
  verifyMongooseId,
  postsController.deletePost
);

// @route PATCH /api/posts/:id/reactions
// @desc React or unreact to a post
// @access Private
router.patch(
  '/:id/reactions',
  verifyToken,
  verifyMongooseId,
  postsController.reactPost
);

module.exports = router;
