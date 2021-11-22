// models
const User = require('../models/userModel');

const { notifyServerError } = require('../helpers/notifyError');

const usersController = {};

usersController.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');

    if (!user) {
      return res
        .status(404)
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
      message: 'Get current user successfully',
      user: filteredUser,
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

usersController.getUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res
        .status(404)
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
  const { userId } = req.params; // ID of followed user

  // Prevent same user ID
  if (userId !== req.userId) {
    try {
      const currentUser = await User.findById(req.userId);
      const followedUser = await User.findById(userId);

      if (!followedUser) {
        res
          .status(403)
          .json({ success: false, message: 'Followed user not found' });
      }

      if (!currentUser.followings.includes(userId)) {
        await currentUser.updateOne({ $push: { followings: userId } });
        await followedUser.updateOne({ $push: { followers: req.userId } });

        res.json({
          success: true,
          message: 'Follow user successfully',
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
  const { userId } = req.params; // ID of unfollowed user

  // Prevent same user ID
  if (userId !== req.userId) {
    try {
      const currentUser = await User.findById(req.userId);
      const unfollowedUser = await User.findById(userId);

      if (!unfollowedUser) {
        res
          .status(403)
          .json({ success: false, message: 'Unfollow user not found' });
      }

      if (currentUser.followings.includes(userId)) {
        await currentUser.updateOne({ $pull: { followings: userId } });
        await unfollowedUser.updateOne({ $pull: { followers: req.userId } });

        res.json({
          success: true,
          message: 'Unfollow user successfully',
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

usersController.getFriends = async (req, res) => {
  const { userId } = req.params;
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  if (!userId) {
    return res
      .status(404)
      .json({ success: false, message: 'User ID is required' });
  }

  try {
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    const total = await User.count({
      followers: { $in: [userId] },
    });

    const startPos = (page - 1) * limit;
    const endPos = page * limit;

    const prevPage = startPos > 0 ? page - 1 : null;
    const nextPage = endPos < total ? page + 1 : null;

    const friends = await User.find({
      followers: { $in: [userId] },
    })
      .skip(startPos)
      .limit(limit);

    res.json({
      success: true,
      message: 'Get user friends successfully',
      friends,
      total,
      prevPage,
      nextPage,
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

module.exports = usersController;
