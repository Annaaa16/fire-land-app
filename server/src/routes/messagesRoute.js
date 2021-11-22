const express = require('express');

const verifyToken = require('../middlewares/authMiddleware');
const verifyMongooseId = require('../middlewares/mongooseMiddleware');
const messageController = require('../controllers/messageController');

const router = express.Router();

// @route POST api/messages
// @desc Create new message
// @access Private
router.post('/', verifyToken, messageController.createMessage);

// @route POST api/messages/:conversationId
// @desc Get message by conversation ID
// @access Private
router.get(
  '/:conversationId',
  verifyToken,
  verifyMongooseId,
  messageController.getMessages
);

module.exports = router;
