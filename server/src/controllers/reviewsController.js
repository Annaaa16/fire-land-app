// models
const User = require('../models/userModel');
const Review = require('../models/reviewModel');

const { notifyServerError } = require('../helpers/notifyError');
const paginate = require('../helpers/paginate');

const reviewsController = {};

reviewsController.createReview = async (req, res) => {
  const { content, productId } = req.body;

  if (!content) {
    return res
      .status(400)
      .json({ success: false, message: 'Content is required!' });
  }

  try {
    const user = await User.findById(req.userId);

    const review = new Review({
      content,
      user: req.userId,
      productId,
    });

    await review.save();

    res.status(201).json({
      success: true,
      message: 'New review has been created successfully',
      review: {
        ...review.toObject(),
        user,
      },
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

reviewsController.getReviews = async (req, res) => {
  const { productId } = req.params;

  try {
    const total = await Review.count({ productId });

    const { skip, limit, nextPage, prevPage } = paginate(req, total);

    const reviews = await Review.find({ productId })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: 'desc' })
      .populate('user')
      .lean();

    res.json({
      success: true,
      message: 'Get reviews successfully!',
      reviews,
      total,
      prevPage,
      nextPage,
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

module.exports = reviewsController;
