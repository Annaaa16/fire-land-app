const express = require('express');

const verifyTokens = require('../middlewares/authMiddleware');
const verifyMongooseId = require('../middlewares/mongooseMiddleware');
const messageController = require('../controllers/messageController');

const router = express.Router();

// @route POST api/messages
// @desc Create new message
// @access Private
router.post('/', verifyTokens, messageController.createMessage);

// @route POST api/messages/:conversationId
// @desc Get message by conversation ID
// @access Private
router.get(
  '/:conversationId',
  verifyTokens,
  verifyMongooseId,
  messageController.getMessages
);

module.exports = router;
