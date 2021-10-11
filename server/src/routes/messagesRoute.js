const express = require('express');

const messageController = require('../controllers/messageController');

const router = express.Router();

// @route POST api/messages
// @desc Create new message
// @access Private
router.post('/', messageController.createMessage);

// @route POST api/messages/:conversationId
// @desc Get message by conversation ID
// @access Private
router.get('/:conversationId', messageController.getMessages);

module.exports = router;
