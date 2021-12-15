const time = require('../helpers/time');

const LISTENS = {
  SEND_MESSAGE: 'sendMessage',
  JOIN_CONVERSATION: 'joinConversation',
  LEAVE_CONVERSATION: 'leaveConversation',
  DISCONNECT: 'disconnect',
};

const EMITS = {
  RECEIVE_MESSAGE: 'receiveMessage',
  RECEIVE_ONLINE_USERS: 'receiveOnlineUsers',
};

let users = [];

const joinConversation = ({ user: currentUser, conversationId, socketId }) => {
  if (!currentUser?._id || !conversationId) return;

  const isJoined = users.some(
    (user) => user._id === currentUser._id || user.socketId === socketId
  );

  if (isJoined) return;

  users.push({ ...currentUser, conversationId, socketId });
};

const leaveConversation = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getCurrentUser = (socketId) => {
  return users.find((user) => user.socketId === socketId);
};

const registerConversationsHandler = (io, socket) => {
  socket.on(LISTENS.JOIN_CONVERSATION, ({ user, conversationId }) => {
    joinConversation({ user, conversationId, socketId: socket.id });

    socket.join(conversationId);
  });

  socket.on(LISTENS.SEND_MESSAGE, (text) => {
    const sender = getCurrentUser(socket.id);

    if (sender) {
      io.to(sender.conversationId).emit(EMITS.RECEIVE_MESSAGE, {
        user: sender,
        text,
        createdAt: time.createCreatedAt(),
      });
    }
  });

  socket.on(LISTENS.LEAVE_CONVERSATION, () => {
    leaveConversation(socket.id);
  });

  socket.on(LISTENS.DISCONNECT, () => {
    leaveConversation(socket.id);
  });
};

module.exports = registerConversationsHandler;
