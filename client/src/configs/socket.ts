// socket
import io from 'socket.io-client';

// types
import { SocketEmits, SocketListens } from '@/models/socket';

import { API_URLS } from '../constants';

export const EMITS: SocketEmits = {
  SEND_MESSAGE: 'sendMessage',
  JOIN_CONVERSATION: 'joinConversation',
  LEAVE_CONVERSATION: 'leaveConversation',
  ADD_ONLINE_USER: 'addOnlineUser',
  SEND_NOTIFICATION: 'sendNotification',
  DISCONNECT: 'disconnect',
};

export const LISTENS: SocketListens = {
  RECEIVE_MESSAGE: 'receiveMessage',
  RECEIVE_NOTIFICATION: 'receiveNotification',
  RECEIVE_ONLINE_USERS: 'receiveOnlineUsers',
};

const socket = io(API_URLS.SOCKET, {
  withCredentials: true,
});

export default socket;
