const mongoose = require('mongoose');

const ReactionSchema = new mongoose.Schema({
  _id: false,
  userId: { type: String },
  emotion: { type: String },
});

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
    reactions: [ReactionSchema],
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
