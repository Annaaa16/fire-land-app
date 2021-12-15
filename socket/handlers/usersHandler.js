const LISTENS = {
  ADD_ONLINE_USER: 'addOnlineUser',
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
};

const EMITS = {
  RECEIVE_ONLINE_USERS: 'receiveOnlineUsers',
};

let onlineUsers = [];

const addOnlineUser = ({ user: currentUser, socketId }) => {
  const isOnline = onlineUsers.some(
    (user) => user._id === currentUser._id || user.socketId === socketId
  );

  if (isOnline) return;

  onlineUsers.push({ ...currentUser, socketId });
};

const removeOfflineUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const registerUsersHandler = (io, socket) => {
  socket.on(LISTENS.ADD_ONLINE_USER, (user) => {
    addOnlineUser({ user, socketId: socket.id });

    io.emit(EMITS.RECEIVE_ONLINE_USERS, onlineUsers);
  });

  socket.on(LISTENS.DISCONNECT, () => {
    removeOfflineUser(socket.id);

    io.emit(EMITS.RECEIVE_ONLINE_USERS, onlineUsers);
  });
};

module.exports = registerUsersHandler;
