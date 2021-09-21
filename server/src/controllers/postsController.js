const Post = require('../models/postModel');
const User = require('../models/userModel');

const { notifyServerError } = require('../utils/serverNotify');

const postsController = {};

postsController.createPost = async (req, res) => {
  const { content, attachment } = req.body;

  // Empty content and attachment
  if (!content.trim() && !attachment.trim()) {
    return res
      .status(400)
      .json({ success: false, message: 'Content or attachment is required!' });
  }

  try {
    const user = await User.findById(req.userId).select([
      '-password',
      '-createdAt',
      '-__v',
    ]);

    const post = new Post({
      content,
      attachment,
      user,
    });

    // Save to db
    await post.save();

    res.json({
      success: true,
      message: 'New post has been created successfully',
      post,
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

postsController.getPosts = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  // Not specify page or limit then return all posts
  if (!page || !limit) {
    try {
      const posts = await Post.find()
        .sort({ createdAt: 'desc' })
        .populate('user', ['username', 'avatar']);

      return res.json({ success: true, posts });
    } catch (error) {
      notifyServerError(res, error);
    }
  }

  const totalPosts = await Post.count();

  const startPos = (page - 1) * limit;
  const endPos = page * limit;

  const prevPage = startPos > 0 ? page - 1 : null;
  const nextPage = endPos < totalPosts ? page + 1 : null;

  // Pagination
  try {
    const posts = await Post.find()
      .skip(startPos)
      .limit(limit)
      .sort({ createdAt: 'desc' })
      .populate('user', ['username', 'avatar']);

    return res.json({ success: true, prevPage, nextPage, posts });
  } catch (error) {
    notifyServerError(res, error);
  }
};

postsController.updatePost = async (req, res) => {
  const { content, attachment } = req.body;

  // Empty content and attachment
  if (!content.trim() && !attachment.trim()) {
    return res
      .status(400)
      .json({ success: false, message: 'Content or attachment is required!' });
  }

  try {
    const post = { content, attachment };
    const updateCondition = { _id: req.params.id, user: req.userId };
    const updatedPost = await Post.findOneAndUpdate(updateCondition, post, {
      new: true,
    });

    // Invalid post id or user not authorized
    if (!updatedPost) {
      return res.status(401).json({
        success: false,
        message: 'Post not found or user is not authorized',
      });
    }

    res.json({ success: true, message: 'Post is updated!', updatedPost });
  } catch (error) {
    notifyServerError(res, error);
  }
};

postsController.deletePost = async (req, res) => {
  try {
    const deleteCondition = { _id: req.params.id, user: req.userId };
    const deletedPost = await Post.findOneAndDelete(deleteCondition);

    // Invalid post id or user not authorized
    if (!deletedPost) {
      return res.status(401).json({
        success: false,
        message: 'Post not found or user is not authorized',
      });
    }

    res.json({ success: true, message: 'Post is deleted!', deletedPost });
  } catch (error) {
    notifyServerError(res, error);
  }
};

postsController.likePost = async (req, res) => {
  const { likeCount } = req.body;

  try {
    const likedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { likeCount },
      { new: true }
    );

    // Invalid post id
    if (!likedPost) {
      return res.status(401).json({
        success: false,
        message: 'Post not found',
      });
    }

    res.json({ success: true, message: 'Post is liked!', likedPost });
  } catch (error) {
    notifyServerError(res, error);
  }
};

module.exports = postsController;
