// models
const Post = require('../models/postModel');
const User = require('../models/userModel');

const { CLOUDINARY } = require('../constants');
const cloudinary = require('../configs/cloudinaryConfig');

const { notifyServerError } = require('../helpers/notifyError');

const postsController = {};

postsController.createPost = async (req, res) => {
  const { content } = req.body;
  let photo = req.file?.path; // Read photo file path from client

  // Content and attachment is empty
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
      message: 'The post has been created successfully',
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
      .json({ success: false, message: 'Page and limit params is required' });
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
    const updateCondition = { _id: req.params.id, user: req.userId };

    const post = await Post.findOne(updateCondition);

    if (!post) {
      return res.status(401).json({
        success: false,
        message: 'Post not found or user is not authorized',
      });
    }

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

    const newPost = {
      content,
      photo: photo || photoUrl, // New photo or old photo
      photoId,
    };

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, newPost, {
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

postsController.reactPost = async (req, res) => {
  const { isReact, isUpdate, emotion } = req.body;

  // React post but not send emotion
  if (isReact && !emotion) {
    return res.status(400).json({
      success: false,
      message: 'Emotion is required',
    });
  }

  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    const reactCondition = { _id: req.params.id };

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
