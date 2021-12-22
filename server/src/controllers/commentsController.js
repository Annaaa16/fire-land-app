// models
const User = require('../models/userModel');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');

const { notifyServerError } = require('../helpers/notifyError');
const paginate = require('../helpers/paginate');

const commentsController = {};

commentsController.createComment = async (req, res) => {
  const { postId, userId, content } = req.body;

  if (!content) {
    return res
      .status(400)
      .json({ success: false, message: 'Content is required!' });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    const updatePostCondition = { _id: postId };

    const post = await Post.findOneAndUpdate(
      updatePostCondition,
      { $inc: { commentCount: 1 } },
      { new: true }
    );

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: 'Post not found' });
    }

    const comment = new Comment({ content, user: user._id, postId });

    await comment.save();

    res.status(201).json({
      success: true,
      message: 'New comment has been created successfully',
      comment: {
        ...comment.toObject(),
        user,
      },
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

commentsController.getComments = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: 'Post not found' });
    }

    const total = await Comment.count({ postId });

    const { skip, limit, nextPage, prevPage } = paginate(req, total);

    const comments = await Comment.find({ postId })
      .skip(skip)
      .limit(limit)
      .populate('user')
      .lean();

    res.json({
      success: true,
      message: 'Get comments successfully!',
      comments,
      total,
      prevPage,
      nextPage,
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

module.exports = commentsController;
