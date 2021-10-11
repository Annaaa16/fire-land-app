// model
const Conversation = require('../models/conversationModel');

const { notifyServerError } = require('../helpers/notifyServer');

const conversationsController = {};

conversationsController.createConversation = async (req, res) => {
  const { senderId, receiverId } = req.body;

  const conversation = new Conversation({
    memberIds: [senderId, receiverId],
  });

  try {
    await conversation.save();

    return res.json({
      success: true,
      message: 'Create conversation successfully',
      conversation,
    });
  } catch (error) {
    notifyServerError(error);
  }
};

conversationsController.getConversationsOfUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const conversations = await Conversation.find({
      memberIds: { $in: [userId] },
    });

    return res.json({
      success: true,
      message: 'Get conversations successfully',
      conversations,
    });
  } catch (error) {
    notifyServerError(error);
  }
};

module.exports = conversationsController;
