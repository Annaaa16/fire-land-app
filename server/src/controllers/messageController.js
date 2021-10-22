// models
const Message = require('../models/messageModel');

const { notifyServerError } = require('../helpers/notifyServerError');

const messagesController = {};

messagesController.createMessage = async (req, res) => {
  try {
    const message = new Message(req.body);

    await message.save();

    return res.json({ success: true, message });
  } catch (error) {
    notifyServerError(res, error);
  }
};

messagesController.getMessages = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const messages = await Message.find({ conversationId });

    return res.json({
      success: true,
      message: 'Get messages successfully',
      messages,
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

module.exports = messagesController;
