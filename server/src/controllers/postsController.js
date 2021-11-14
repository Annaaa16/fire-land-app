// models
const Post = require('../models/postModel');
const User = require('../models/userModel');

const { CLOUDINARY } = require('../constants');
const cloudinary = require('../configs/cloudinaryConfig');

const { notifyServerError } = require('../helpers/notifyServerError');

const postsController = {};

postsController.createPost = async (req, res) => {
  const { content } = req.body;
  let photo = req.file?.path; // Read photo file path from client

  // Empty content and attachment
  if (!content && !photo) {
    return res
      .status(400)
      .json({ success: false, message: 'Content or attachment is required!' });
  }

  try {
    const user = await User.findById(req.userId).select(['-password']);

    let photoId = '';

    // Upload photo to cloudinary
    if (photo) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        photo,
        {
          folder: CLOUDINARY.PATH_UPLOAD,
        }
      );

      photo = secure_url;
      photoId = public_id;
    } else {
      photo = '';
    }

    const post = new Post({
      content,
      user,
      photo,
      photoId,
    });

    await post.save();

    res.status(201).json({
      success: true,
      message: 'New post has been created successfully',
      post: post.toObject(),
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

postsController.getPosts = async (req, res) => {
  const { user_id } = req.query;
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  // Not specify page or limit then return all posts
  if (!page || !limit) {
    return res
      .status(400)
      .json({ success: false, message: 'Page and limit params is required!' });
  }

  const total = await Post.count(
    user_id && {
      user: { $eq: user_id },
    }
  );

  const startPos = (page - 1) * limit;
  const endPos = page * limit;

  const prevPage = startPos > 0 ? page - 1 : null;
  const nextPage = endPos < total ? page + 1 : null;

  // Pagination
  try {
    const posts = await Post.find(
      user_id && {
        user: { $eq: user_id },
      }
    )
      .sort({ createdAt: 'desc' })
      .skip(startPos)
      .limit(limit)
      .populate('user')
      .lean();

    res.json({
      success: true,
      prevPage,
      nextPage,
      total,
      posts,
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

postsController.updatePost = async (req, res) => {
  let { content, photo: photoUrl, photoId } = req.body;

  let photo = req.file?.path; // Read photo file path from client

  // Empty content and photo
  if (!content?.trim() && !photo) {
    return res
      .status(400)
      .json({ success: false, message: 'Content or attachment is required!' });
  }

  try {
    // Replace photo
    if (photo && photoId) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        photo,
        {
          public_id: photoId,
          overwrite: true,
          invalidate: true,
        }
      );

      photo = secure_url;
      photoId = public_id;
    }
    // Add photo to post
    else if (!photoId && photo) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        photo,
        {
          folder: CLOUDINARY.PATH_UPLOAD,
        }
      );

      photo = secure_url;
      photoId = public_id;
    } else {
      photo = '';
      photoId = '';
    }

    const post = {
      content,
      photo: photo || photoUrl, // New photo or old photo
      photoId,
    };
    const updateCondition = { _id: req.params.id, user: req.userId };

    const updatedPost = await Post.findOneAndUpdate(updateCondition, post, {
      new: true,
    })
      .populate('user')
      .lean();

    // Invalid post id or user not authorized
    if (!updatedPost) {
      return res.status(401).json({
        success: false,
        message: 'Post not found or user is not authorized',
      });
    }

    res.json({
      success: true,
      message: 'Post is updated!',
      post: updatedPost,
    });
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

    // Delete photo on cloudinary
    if (deletedPost?.photoId) {
      await cloudinary.uploader.destroy(deletedPost.photoId);
    }

    res.json({
      success: true,
      message: 'Post is deleted!',
      postId: deletedPost._id,
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

postsController.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    const likeCondition = { _id: req.params.id };

    if (!post.likes.includes(req.userId)) {
      const likedPost = await Post.findOneAndUpdate(
        likeCondition,
        { $push: { likes: req.userId } },
        {
          new: true,
        }
      );

      res.json({
        success: true,
        message: 'The post has been liked',
        post: likedPost,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'The post has already been liked',
      });
    }
  } catch (error) {
    notifyServerError(res, error);
  }
};

postsController.unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    const unlikeCondition = { _id: req.params.id };

    if (post.likes.includes(req.userId)) {
      const unlikedPost = await Post.findOneAndUpdate(
        unlikeCondition,
        { $pull: { likes: req.userId } },
        { new: true }
      );

      res.json({
        success: true,
        message: 'Unlike post successfully',
        post: unlikedPost,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Post already unliked',
      });
    }
  } catch (error) {
    notifyServerError(res, error);
  }
};

module.exports = postsController;
