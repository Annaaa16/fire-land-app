const express = require('express');

const verifyToken = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const postsController = require('../controllers/postsController');

const router = express.Router();

// @route POST /api/posts
// @desc Create new post
// @access Private
router.post(
  '/create',
  verifyToken,
  upload.single('file'),
  postsController.createPost
);

// @route GET /api/posts
// @desc Get all posts or limit posts
// @access Private
router.get('/', verifyToken, postsController.getPosts);

// @route PUT /api/posts/:id
// @desc Update post
// @access Private
router.put(
  '/:id',
  verifyToken,
  upload.single('file'),
  postsController.updatePost
);

// @route DELETE /api/posts/:id
// @desc Delete post
// @access Private
router.delete('/:id', verifyToken, postsController.deletePost);

// @route PATCH /api/posts/:id/like
// @desc Like post
// @access Private
router.patch('/:id/like', verifyToken, postsController.likePost);

// @route PATCH /api/posts/:id/unlike
// @desc Unlike post
// @access Private
router.patch('/:id/unlike', verifyToken, postsController.unlikePost);

module.exports = router;
