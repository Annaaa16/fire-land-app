// models
const Message = require('../models/messageModel');

const { notifyServerError } = require('../helpers/notifyError');

const messagesController = {};

messagesController.createMessage = async (req, res) => {
  const { senderId, conversationId, text } = req.body;

  try {
    const message = new Message({ user: senderId, conversationId, text });

    await message.save();

    res.json({ success: true, message: 'Create message successfully' });
  } catch (error) {
    notifyServerError(res, error);
  }
};

messagesController.getMessages = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const messages = await Message.find({ conversationId })
      .populate('user', ['-password'])
      .lean();

    res.json({
      success: true,
      message: 'Get messages successfully',
      messages,
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

module.exports = messagesController;
