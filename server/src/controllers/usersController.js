// models
const User = require('../models/userModel');

const { notifyServerError } = require('../helpers/notifyServerError');

const usersController = {};

usersController.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'User not found' });
    }

    const filteredUser = {
      _id: user._id,
      username: user.username,
      avatar: user.avatar,
      followings: user.followings,
      followers: user.followers,
    };

    res.json({
      success: true,
      message: 'User has successfully logged in',
      user: filteredUser,
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

usersController.getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      message: 'Get user successfully',
      user,
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

usersController.followUser = async (req, res) => {
  const { userId } = req.params;

  // Prevent same user ID
  if (userId !== req.userId) {
    try {
      const currentUser = await User.findById(req.userId);
      const followedUser = await User.findById(userId);

      if (!followedUser) {
        return res
          .status(403)
          .json({ success: false, message: 'Followed user not found' });
      }

      if (!currentUser.followings.includes(userId)) {
        await currentUser.updateOne({ $push: { followings: userId } });
        await followedUser.updateOne({ $push: { followers: userId } });

        return res.json({
          success: true,
          message: 'User has been followed',
          userId,
        });
      } else {
        return res.status(403).json({
          success: false,
          message: 'You already follow this user',
        });
      }
    } catch (error) {
      notifyServerError(res, error);
    }
  } else {
    return res
      .status(403)
      .json({ success: false, message: "You can't follow yourself!" });
  }
};

usersController.unfollowUser = async (req, res) => {
  const { userId } = req.params;

  // Prevent same user ID
  if (userId !== req.userId) {
    try {
      const currentUser = await User.findById(req.userId);
      const unfollowedUser = await User.findById(userId);

      if (!unfollowedUser) {
        return res
          .status(403)
          .json({ success: false, message: 'Unfollow user not found' });
      }

      if (currentUser.followings.includes(userId)) {
        await currentUser.updateOne({ $pull: { followings: userId } });
        await unfollowedUser.updateOne({ $pull: { followers: userId } });

        return res.json({
          success: true,
          message: 'User has been unfollowed',
          userId,
        });
      } else {
        return res.status(403).json({
          success: false,
          message: 'You already unfollow this user',
        });
      }
    } catch (error) {
      notifyServerError(res, error);
    }
  } else {
    return res
      .status(403)
      .json({ success: false, message: "You can't unfollow yourself!" });
  }
};

module.exports = usersController;
