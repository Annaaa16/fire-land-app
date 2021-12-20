// models
const User = require('../models/userModel');
const Conversation = require('../models/conversationModel');
const Message = require('../models/messageModel');

const { notifyServerError } = require('../helpers/notifyError');

const usersController = {};

usersController.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      message: 'Get current user successfully',
      user,
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

usersController.getUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

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

usersController.addFriendUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const currentUser = await User.findById(req.userId);
    const friendedUser = await User.findById(userId);

    const isFriend = currentUser.friends.includes(userId);

    if (isFriend) {
      return res
        .status(400)
        .json({ success: false, message: 'You already friend this person' });
    }

    await Conversation.create({
      creators: [req.userId, userId],
      members: [req.userId, userId],
    });
    await friendedUser.updateOne({
      $push: { friends: req.userId, followers: req.userId },
    });

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        $push: { friends: userId, followings: userId },
      },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Add friend successfully',
      user,
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

usersController.unfriendUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const currentUser = await User.findById(req.userId);
    const unfriendedUser = await User.findById(userId);

    if (!unfriendedUser) {
      return res
        .status(404)
        .json({ success: false, message: 'Unfriended user not found' });
    }

    const isFriend = currentUser.friends.includes(userId);

    if (!isFriend) {
      return res
        .status(400)
        .json({ success: false, message: 'You already unfriend this person' });
    }

    const deletedConversation = await Conversation.findOneAndDelete({
      creators: [req.userId, userId],
    });

    await Message.deleteMany({
      conversationId: { $eq: deletedConversation?._id },
    });
    await unfriendedUser.updateOne({
      $pull: { friends: req.userId, followers: req.userId },
    });

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        $pull: { friends: userId, followings: userId },
      },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Unfriend successfully',
      user,
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

usersController.followUser = async (req, res) => {
  const { userId } = req.params; // ID of followed user

  if (userId === req.userId) {
    return res
      .status(403)
      .json({ success: false, message: "You can't follow yourself!" });
  }

  try {
    const currentUser = await User.findById(req.userId);
    const followedUser = await User.findById(userId);

    if (!followedUser) {
      return res
        .status(403)
        .json({ success: false, message: 'Followed user not found' });
    }

    const isFollowing = currentUser.followings.includes(userId);

    if (isFollowing) {
      return res.status(403).json({
        success: false,
        message: 'You already follow this user',
      });
    }

    await currentUser.updateOne({ $push: { followings: userId } });
    await followedUser.updateOne({ $push: { followers: req.userId } });

    res.json({
      success: true,
      message: 'Follow user successfully',
      userId,
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

usersController.unfollowUser = async (req, res) => {
  const { userId } = req.params; // ID of unfollowed user

  if (userId === req.userId) {
    return res
      .status(403)
      .json({ success: false, message: "You can't unfollow yourself!" });
  }

  try {
    const currentUser = await User.findById(req.userId);
    const unfollowedUser = await User.findById(userId);

    if (!unfollowedUser) {
      return res
        .status(403)
        .json({ success: false, message: 'Unfollow user not found' });
    }

    const isFollowing = currentUser.followings.includes(userId);

    if (!isFollowing) {
      return res.status(403).json({
        success: false,
        message: 'You already unfollow this user',
      });
    }

    await currentUser.updateOne({ $pull: { followings: userId } });
    await unfollowedUser.updateOne({ $pull: { followers: req.userId } });

    res.json({
      success: true,
      message: 'Unfollow user successfully',
      userId,
    });
  } catch (error) {
    notifyServerError(res, error);
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
    const user = await User.findById(userId);

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
      friends: { $in: [userId] },
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
