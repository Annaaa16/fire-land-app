// types
import {
  SocketEmits,
  SocketListens,
  UserEmits,
  UserListens,
} from 'src/types/socket';
import { User } from 'src/types/common';

interface CurrentSockets {
  [userId: string]: string[];
}

const LISTENS: UserListens = {
  ADD_ONLINE_USER: 'addOnlineUser',
  DISCONNECT: 'disconnect',
};

const EMITS: UserEmits = {
  RECEIVE_ONLINE_USERS: 'receiveOnlineUsers',
};

let currentSockets: CurrentSockets = {};
let onlineUsers: User[] = [];

const isOnline = (userId: string, socketId: string) => {
  return onlineUsers.some(
    (user) => user._id === userId || user.socketId === socketId
  );
};

const addCurrentSocket = (userId: string, socketId: string) => {
  if (!userId) return;

  if (!currentSockets[userId]) currentSockets[userId] = [];

  if (currentSockets[userId].includes(socketId)) return;

  currentSockets[userId].push(socketId);
};

const addOnlineUser = (currentUser: User, socketId: string) => {
  if (isOnline(currentUser._id, socketId)) return;

  onlineUsers.push({ ...currentUser, socketId });
};

const removeCurrentSocket = (userId: string, socketId: string) => {
  if (!currentSockets[userId]) return;

  currentSockets[userId].splice(currentSockets[userId].indexOf(socketId), 1);
};

const removeOfflineUser = (socketId: string) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const usersHandler = (io: SocketEmits, socket: SocketListens) => {
  const userId = socket.handshake.query.userId as string;

  // Empty user ID
  if (!userId) return;

  socket.on(LISTENS.ADD_ONLINE_USER, (user: User) => {
    addCurrentSocket(userId, socket.id);

    if (isOnline(userId, socket.id)) return;

    addOnlineUser(user, socket.id);

    io.emit(EMITS.RECEIVE_ONLINE_USERS, onlineUsers);
  });

  socket.on(LISTENS.DISCONNECT, () => {
    removeCurrentSocket(userId, socket.id);

    if (currentSockets[userId]?.length === 0) {
      removeOfflineUser(socket.id);
      io.emit(EMITS.RECEIVE_ONLINE_USERS, onlineUsers);

      delete currentSockets[userId];
    }

    socket.disconnect();
  });
};

export default usersHandler;
