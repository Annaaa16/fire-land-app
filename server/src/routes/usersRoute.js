const express = require('express');

const verifyToken = require('../middlewares/authMiddleware');
const verifyMongooseId = require('../middlewares/mongooseMiddleware');
const usersController = require('../controllers/usersController');

const router = express.Router();

// @route GET api/users
// @desc Get current user
// @access Private
router.get('/current', verifyToken, usersController.getCurrentUser);

// @route GET api/users/:userId
// @desc Get user by id
// @access Private
router.get('/:userId', verifyToken, verifyMongooseId, usersController.getUser);

// @route PATCH api/users/:userId/follow
// @desc Follow an user
// @access Private
router.patch('/:userId/follow', verifyToken, usersController.followUser);

// @route PATCH api/users/:userId/unfollow
// @desc Unfollow an user
// @access Private
router.patch('/:userId/unfollow', verifyToken, usersController.unfollowUser);

// @route GET api/users/:userId/friends
// @desc Get user's friends
// @access Private
router.get('/:userId/friends', verifyToken, usersController.getFriends);

module.exports = router;
