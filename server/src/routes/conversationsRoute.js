const express = require('express');

const verifyTokens = require('../middlewares/authMiddleware');
const verifyMongooseId = require('../middlewares/mongooseMiddleware');
const conversationsController = require('../controllers/conversationsController');

const router = express.Router();

// @route POST api/conversations/create
// @desc Create new conversation
// @access Private
router.post(
  '/create',
  verifyTokens,
  conversationsController.createConversation
);

// @route GET api/conversations/:userId
// @desc Get user conversations
// @access Private
router.get(
  '/:userId',
  verifyTokens,
  verifyMongooseId,
  conversationsController.getConversations
);

// @route DELETE api/conversations/:conversationId
// @desc Delete conversation
// @access Private
router.delete(
  '/:conversationId',
  verifyTokens,
  verifyMongooseId,
  conversationsController.deleteConversation
);

module.exports = router;
