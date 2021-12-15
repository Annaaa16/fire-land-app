const express = require('express');

const verifyTokens = require('../middlewares/authMiddleware');
const verifyMongooseId = require('../middlewares/mongooseMiddleware');
const usersController = require('../controllers/usersController');

const router = express.Router();

// @route GET api/users/current
// @desc Get current user
// @access Private
router.get('/current', verifyTokens, usersController.getCurrentUser);

// @route GET api/users/:userId
// @desc Get user by id
// @access Private
router.get('/:userId', verifyTokens, verifyMongooseId, usersController.getUser);

// @route PATCH api/users/:userId/friend
// @desc Add friend
// @access Private
router.patch(
  '/:userId/friend',
  verifyTokens,
  verifyMongooseId,
  usersController.addFriendUser
);

// @route PATCH api/users/:userId/unfriend
// @desc Unfriend
// @access Private
router.patch(
  '/:userId/unfriend',
  verifyTokens,
  verifyMongooseId,
  usersController.unfriendUser
);

// @route PATCH api/users/:userId/follow
// @desc Follow an user
// @access Private
router.patch(
  '/:userId/follow',
  verifyTokens,
  verifyMongooseId,
  usersController.followUser
);

// @route PATCH api/users/:userId/unfollow
// @desc Unfollow an user
// @access Private
router.patch(
  '/:userId/unfollow',
  verifyTokens,
  verifyMongooseId,
  usersController.unfollowUser
);

// @route GET api/users/:userId/friends
// @desc Get user's friends
// @access Private
router.get(
  '/:userId/friends',
  verifyTokens,
  verifyMongooseId,
  usersController.getFriends
);

module.exports = router;
