const express = require('express');

const verifyTokens = require('../middlewares/authMiddleware');
const verifyQueries = require('../middlewares/queriesMiddleware');
const reviewsController = require('../controllers/reviewsController');

const router = express.Router();

// @route GET api/reviews/create
// @desc Create product's review
// @access Private
router.post('/create', verifyTokens, reviewsController.createReview);

// @route GET api/reviews/:productId
// @desc Get product's reviews
// @access Private
router.get(
  '/:productId',
  verifyTokens,
  verifyQueries,
  reviewsController.getReviews
);

module.exports = router;
