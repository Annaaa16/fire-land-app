// models
const Conversation = require('../models/conversationModel');
const User = require('../models/userModel');

const { notifyServerError } = require('../helpers/notifyError');

const conversationsController = {};

conversationsController.createConversation = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    const conversationExisting = await Conversation.findOne({
      members: { $in: [senderId, receiverId] },
    });

    if (conversationExisting) {
      return res.status(400).json({
        success: false,
        message: 'Conversation already exists',
      });
    }

    const conversation = new Conversation({
      members: [senderId, receiverId],
    });

    await conversation.save();

    res.status(201).json({
      success: true,
      message: 'Create conversation successfully',
      conversation,
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

conversationsController.getConversations = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found to get messages' });
    }

    const conversations = await Conversation.find({
      creators: { $in: [userId] },
    })
      .populate('creators')
      .populate('members');

    res.json({
      success: true,
      message: 'Get conversations successfully',
      conversations,
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

conversationsController.deleteConversation = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const conversationExisting = await Conversation.findById(conversationId);

    if (!conversationExisting) {
      return res.status(400).json({
        success: false,
        message: 'Conversation already deleted',
      });
    }

    await Conversation.deleteOne({ _id: conversationId });

    res.json({
      success: true,
      message: 'Delete conversation successfully',
      conversationId,
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

module.exports = conversationsController;
