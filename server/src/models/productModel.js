const mongoose = require('mongoose');

const SoldSchema = new mongoose.Schema({
  _id: false,
  userId: String,
  count: Number,
});

const ProductSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'User',
    },
    name: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    desc: String,
    photo: {
      type: String,
      require: true,
    },
    photoId: {
      type: String,
      require: true,
    },
    reactions: [String],
    sold: [SoldSchema],
    reviewCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
