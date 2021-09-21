const express = require('express');

const postsController = require('../controllers/postsController');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

// @route POST /api/posts
// @desc Create new post
// @access Private
router.post('/', verifyToken, postsController.createPost);

// @route GET /api/posts
// @desc Get all posts or limit posts
// @access Private
router.get('/', verifyToken, postsController.getPosts);

// @route PUT /api/posts/:id
// @desc Update post
// @access Private
router.put('/:id', verifyToken, postsController.updatePost);

// @route DELETE /api/posts/:id
// @desc Delete post
// @access Private
router.delete('/:id', verifyToken, postsController.deletePost);

// @route PATCH /api/posts/:id
// @desc Like post
// @access Private
router.patch('/:id', verifyToken, postsController.likePost);

module.exports = router;
