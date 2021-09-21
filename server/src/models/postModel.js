const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
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
    attachment: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
