const mongoose = require('mongoose');

const UserField = {
  type: [mongoose.Schema.Types.ObjectId],
  ref: 'User',
  default: [],
  required: true,
};

const ConversationSchema = new mongoose.Schema(
  {
    creators: UserField,
    members: UserField,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Conversation', ConversationSchema);
