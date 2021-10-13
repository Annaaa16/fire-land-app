const express = require('express');

const verifyToken = require('../middlewares/authMiddleware');
const usersController = require('../controllers/usersController');

const router = express.Router();

// @route PATCH api/users/:userId/follow
// @desc Follow an user
// @access Private
router.patch('/:userId/follow', verifyToken, usersController.followUser);

// @route PATCH api/users/:userId/unfollow
// @desc Unfollow an user
// @access Private
router.patch('/:userId/unfollow', verifyToken, usersController.unfollowUser);

module.exports = router;
