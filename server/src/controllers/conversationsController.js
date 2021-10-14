// models
const Conversation = require('../models/conversationModel');
const User = require('../models/userModel');

const { notifyServerError } = require('../helpers/notifyServer');

const conversationsController = {};

conversationsController.createConversation = async (req, res) => {
  const { senderId, receiverId } = req.body;

  const conversation = new Conversation({
    memberIds: [senderId, receiverId],
  });

  try {
    await conversation.save();

    return res.status(201).json({
      success: true,
      message: 'Create conversation successfully',
      conversation,
    });
  } catch (error) {
    notifyServerError(error);
  }
};

conversationsController.getUserConversation = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found to get messages' });
    }

    const conversations = await Conversation.find({
      memberIds: { $in: [userId] },
    });

    return res.json({
      success: true,
      message: 'Get conversations successfully',
      conversations,
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

module.exports = conversationsController;
