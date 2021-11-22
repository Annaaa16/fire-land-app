const express = require('express');

const verifyToken = require('../middlewares/authMiddleware');
const verifyMongooseId = require('../middlewares/mongooseMiddleware');
const conversationsController = require('../controllers/conversationsController');

const router = express.Router();

// @route POST api/conversations/create
// @desc Create new conversation
// @access Private
router.post('/create', verifyToken, conversationsController.createConversation);

// @route POST api/conversations
// @desc Get user conversations
// @access Private
router.post('/', verifyToken, conversationsController.getConversations);

// @route DELETE api/conversations/:conversationId
// @desc Delete conversation
// @access Private
router.delete(
  '/:conversationId',
  verifyToken,
  verifyMongooseId,
  conversationsController.deleteConversation
);

module.exports = router;
