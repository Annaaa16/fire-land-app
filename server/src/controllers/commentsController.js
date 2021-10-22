const User = require('../models/userModel');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');

const { notifyServerError } = require('../helpers/notifyServerError');

const commentsController = {};

commentsController.createComment = async (req, res) => {
  const { postId, userId, content } = req.body;

  if (!content) {
    return res
      .status(400)
      .json({ success: false, message: 'Content is required!' });
  }

  try {
    const user = await User.findById(userId).select(['-password', '-__v']);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    const post = await Post.findOneAndUpdate(
      { _id: postId },
      { $inc: { commentCount: 1 } },
      { new: true }
    );

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: 'Post not found' });
    }

    const comment = new Comment({ content, user, postId });

    // Save to db
    await comment.save();

    // Filter unnecessary fields of comment
    const { __v, ...others } = comment.toObject();

    res.status(201).json({
      success: true,
      message: 'New comment has been created successfully',
      comment: {
        ...others,
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
    const user = await User.findById(userId).select(['-password', '-__v']);

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
      .populate('user', ['username', 'avatar'])
      .skip(startPos)
      .limit(limit)
      .select(['-__v'])
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
