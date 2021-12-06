// models
const Post = require('../models/postModel');
const User = require('../models/userModel');

const cloudinary = require('../configs/cloudinaryConfig');

const { CLOUDINARY } = require('../constants');
const { uploadPhoto, updatePhoto } = require('../helpers/cloudinaryPhoto');
const { notifyServerError } = require('../helpers/notifyError');

const postsController = {};

postsController.createPost = async (req, res) => {
  const { content } = req.body;
  const photo = req.file?.path; // Read photo path from client

  // Content and attachment is empty
  if (!content && !photo) {
    return res
      .status(400)
      .json({ success: false, message: 'Content or attachment is required!' });
  }

  try {
    const user = await User.findById(req.userId).select(['-password']);

    const { uploadedPhoto, photoId } = await uploadPhoto(
      photo,
      CLOUDINARY.POSTS_UPLOAD_PATH
    );

    const post = new Post({
      content,
      user,
      photo: uploadedPhoto,
      photoId,
    });

    await post.save();

    res.status(201).json({
      success: true,
      message: 'The post has been created successfully',
      post: post.toObject(),
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

postsController.getPosts = async (req, res) => {
  const { userId } = req.params;
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const total = await Post.count(
    userId && {
      user: { $eq: userId },
    }
  );

  const startPos = (page - 1) * limit;
  const endPos = page * limit;

  const prevPage = startPos > 0 ? page - 1 : null;
  const nextPage = endPos < total ? page + 1 : null;

  // Pagination
  try {
    const posts = await Post.find(
      userId && {
        user: { $eq: userId },
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
  const { postId } = req.params;
  const { content, photo: oldPhoto, photoId } = req.body;
  const photo = req.file?.path; // Read photo path from client

  // Empty content and photo
  if (!content?.trim() && !photo) {
    return res
      .status(400)
      .json({ success: false, message: 'Content or attachment is required!' });
  }

  try {
    const updateCondition = { _id: postId, user: req.userId };

    const post = await Post.findOne(updateCondition);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found or user is not authorized',
      });
    }

    const { newPhoto, newPhotoId } = await updatePhoto(
      photo,
      photoId,
      CLOUDINARY.POSTS_UPLOAD_PATH
    );

    const newPost = {
      content,
      photo: newPhoto || oldPhoto,
      photoId: newPhotoId,
    };

    const updatedPost = await Post.findByIdAndUpdate(postId, newPost, {
      new: true,
    })
      .populate('user')
      .lean();

    res.json({
      success: true,
      message: 'Post is updated',
      post: updatedPost,
    });
  } catch (error) {
    notifyServerError(res, error);
  }
};

postsController.deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const deleteCondition = { _id: postId, user: req.userId };

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

postsController.reactPost = async (req, res) => {
  const { isReact, isUpdate, emotion } = req.body;
  const { postId } = req.params;

  const isMissEmotion = isReact && !emotion; // React post but not send emotion

  if (isMissEmotion) {
    return res.status(400).json({
      success: false,
      message: 'Emotion is required',
    });
  }

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    const reactCondition = { _id: postId };

    if (isReact) {
      let reactedPost = null;

      if (isUpdate) {
        const updatedReactions = post.reactions.map((reaction) =>
          reaction.userId === req.userId
            ? { userId: req.userId, emotion: emotion }
            : reaction
        );

        reactedPost = await Post.findOneAndUpdate(
          reactCondition,
          { $set: { reactions: updatedReactions } },
          {
            new: true,
          }
        );
      } else {
        reactedPost = await Post.findOneAndUpdate(
          reactCondition,
          { $push: { reactions: { userId: req.userId, emotion: emotion } } },
          {
            new: true,
          }
        );
      }

      res.json({
        success: true,
        message: 'React to post successfully',
        post: reactedPost,
      });
    } else {
      const isReacted = post.reactions.some(
        (reaction) => reaction.userId === req.userId
      );

      if (isReacted) {
        const unreactedPost = await Post.findOneAndUpdate(
          reactCondition,
          { $pull: { reactions: { userId: req.userId } } },
          { new: true }
        );

        res.json({
          success: true,
          message: 'Unreact to post successfully',
          post: unreactedPost,
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'Post already unreacted',
        });
      }
    }
  } catch (error) {
    notifyServerError(res, error);
  }
};

module.exports = postsController;
