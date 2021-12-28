// types
import {
  ConversationsEmits,
  ConversationsListens,
  SocketEmits,
  SocketListens,
} from 'src/types/socket';
import { User } from 'src/types/common';

import time from '../helpers/time';

const LISTENS: ConversationsListens = {
  SEND_MESSAGE: 'sendMessage',
  JOIN_CONVERSATION: 'joinConversation',
  LEAVE_CONVERSATION: 'leaveConversation',
  DISCONNECT: 'disconnect',
};

const EMITS: ConversationsEmits = {
  RECEIVE_MESSAGE: 'receiveMessage',
};

let users: User[] = [];

const joinConversation = ({
  user: currentUser,
  conversationId,
  socketId,
}: {
  user: User;
  conversationId: string;
  socketId: string;
}) => {
  if (!currentUser?._id || !conversationId) return;

  const isJoined = users.some(
    (user) => user._id === currentUser._id || user.socketId === socketId
  );

  if (!isJoined) users.push({ ...currentUser, conversationId, socketId });
};

const leaveConversation = (socketId: string) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getCurrentUser = (socketId: string) => {
  return users.find((user) => user.socketId === socketId);
};

const conversationsHandler = (io: SocketEmits, socket: SocketListens) => {
  socket.on(LISTENS.JOIN_CONVERSATION, ({ user, conversationId }) => {
    joinConversation({ user, conversationId, socketId: socket.id });

    socket.join(conversationId);
  });

  socket.on(LISTENS.SEND_MESSAGE, (text: string) => {
    const sender = getCurrentUser(socket.id);

    if (!sender) return;

    io.to(sender.conversationId).emit(EMITS.RECEIVE_MESSAGE, {
      user: sender,
      text,
      createdAt: time.createCreatedAt(),
    });
  });

  socket.on(LISTENS.LEAVE_CONVERSATION, () => {
    leaveConversation(socket.id);
  });

  socket.on(LISTENS.DISCONNECT, () => {
    leaveConversation(socket.id);
  });
};

export default conversationsHandler;
