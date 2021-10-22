const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'User',
    },
    postId: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', CommentSchema);
