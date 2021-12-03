const mongoose = require('mongoose');

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
    desc: {
      type: String,
    },
    photo: {
      type: String,
      require: true,
    },
    photoId: {
      type: String,
      require: true,
    },
    reactions: {
      type: Array,
      default: [],
    },
    sold: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
