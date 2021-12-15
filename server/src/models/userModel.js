const mongoose = require('mongoose');

const UserField = {
  type: [mongoose.Schema.Types.ObjectId],
  ref: 'User',
  default: [],
  required: true,
};

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      select: false,
    },
    avatar: String,
    friends: UserField,
    followings: UserField,
    followers: UserField,
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
