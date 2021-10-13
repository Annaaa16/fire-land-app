// models
const User = require('../models/userModel');

const { notifyServerError } = require('../helpers/notifyServer');

const usersController = {};

usersController.followUser = async (req, res) => {
  const { userId } = req.params;

  // Prevent same user ID
  if (userId !== req.userId) {
    try {
      const currentUser = await User.findById(req.userId);
      const followUser = await User.findById(userId);

      // Follow user not found
      if (!followUser) {
        return res
          .status(403)
          .json({ success: false, message: 'Follow user not found' });
      }

      if (!currentUser.followings.includes(userId)) {
        await currentUser.updateOne({ $push: { followings: userId } });
        await followUser.updateOne({ $push: { followers: userId } });

        return res.json({ success: true, message: 'User has been followed' });
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
      const followUser = await User.findById(userId);

      // Unfollow user not found
      if (!followUser) {
        return res
          .status(403)
          .json({ success: false, message: 'Unfollow user not found' });
      }

      if (currentUser.followings.includes(userId)) {
        await currentUser.updateOne({ $pull: { followings: userId } });
        await followUser.updateOne({ $pull: { followers: userId } });

        return res.json({ success: true, message: 'User has been unfollowed' });
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
