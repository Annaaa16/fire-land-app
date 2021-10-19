const express = require('express');

const verifyToken = require('../middlewares/authMiddleware');
const messageController = require('../controllers/messageController');

const router = express.Router();

// @route POST api/messages
// @desc Create new message
// @access Private
router.post('/', verifyToken, messageController.createMessage);

// @route POST api/messages/:conversationId
// @desc Get message by conversation ID
// @access Private
router.get('/:conversationId', verifyToken, messageController.getMessages);

module.exports = router;
