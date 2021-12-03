const User = require('../models/userModel');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');

const { notifyServerError } = require('../helpers/notifyError');

const commentsController = {};

commentsController.createComment = async (req, res) => {
  const { postId, userId, content } = req.body;

  if (!content) {
    return res
      .status(400)
      .json({ success: false, message: 'Content is required!' });
  }

  try {
    const user = await User.findById(userId).select(['-password']);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    const updateCondition = { _id: postId };

    const post = await Post.findOneAndUpdate(
      updateCondition,
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
  const { userId } = req.body;
  const { postId } = req.params;
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  try {
    const user = await User.findById(userId).select(['-password']);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: 'Post not found' });
    }

    const total = await Comment.count({ postId });

    const startPos = (page - 1) * limit;
    const endPos = page * limit;

    const prevPage = startPos > 0 ? page - 1 : null;
    const nextPage = endPos < total ? page + 1 : null;

    const comments = await Comment.find({ postId })
      .populate('user')
      .skip(startPos)
      .limit(limit)
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
