// model
const Message = require('../models/messageModel');

const { notifyServerError } = require('../helpers/notifyServer');

const messagesController = {};

messagesController.createMessage = async (req, res) => {
  const message = new Message(req.body);

  try {
    await message.save();

    return res.json({ success: true, message });
  } catch (error) {
    notifyServerError(error);
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
    notifyServerError(error);
  }
};

module.exports = messagesController;
