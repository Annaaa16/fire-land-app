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
    likes: {
      type: Array,
      default: [],
    },
    photo: {
      type: String,
    },
    photoId: {
      type: String,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
