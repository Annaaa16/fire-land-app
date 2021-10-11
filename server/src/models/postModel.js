const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'User',
    },
    content: {
      type: String,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    photo: {
      type: String,
    },
    photoId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
