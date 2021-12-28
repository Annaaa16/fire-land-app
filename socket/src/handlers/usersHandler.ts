// types
import {
  SocketEmits,
  SocketListens,
  UserEmits,
  UserListens,
} from 'src/types/socket';
import { User } from 'src/types/common';

const LISTENS: UserListens = {
  ADD_ONLINE_USER: 'addOnlineUser',
  DISCONNECT: 'disconnect',
};

const EMITS: UserEmits = {
  RECEIVE_ONLINE_USERS: 'receiveOnlineUsers',
};

let onlineUsers: User[] = [];

const addOnlineUser = ({
  user: currentUser,
  socketId,
}: {
  user: User;
  socketId: string;
}) => {
  const isOnline = onlineUsers.some(
    (user) => user._id === currentUser._id || user.socketId === socketId
  );

  if (isOnline) return;

  onlineUsers.push({ ...currentUser, socketId });
};

const removeOfflineUser = (socketId: string) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const usersHandler = (io: SocketEmits, socket: SocketListens) => {
  socket.on(LISTENS.ADD_ONLINE_USER, (user: User) => {
    addOnlineUser({ user, socketId: socket.id });

    io.emit(EMITS.RECEIVE_ONLINE_USERS, onlineUsers);
  });

  socket.on(LISTENS.DISCONNECT, () => {
    removeOfflineUser(socket.id);

    io.emit(EMITS.RECEIVE_ONLINE_USERS, onlineUsers);
  });
};

export default usersHandler;
