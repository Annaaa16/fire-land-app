const express = require('express');

const verifyToken = require('../middlewares/authMiddleware');
const conversationsController = require('../controllers/conversationsController');

const router = express.Router();

// @route POST api/conversations
// @desc Create new conversation
// @access Private
router.post('/', verifyToken, conversationsController.createConversation);

// @route GET api/conversations/:userId
// @desc Get conversations of a user
// @access Private
router.get('/:userId', verifyToken, conversationsController.getConversations);

module.exports = router;
