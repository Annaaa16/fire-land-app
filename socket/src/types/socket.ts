// types
import type { Server, Socket } from 'socket.io';
import { User } from './users';

interface Listens {
  sendMessage: (text: string) => void;
  joinConversation: (response: { user: User; conversationId: string }) => void;
  leaveConversation: () => void;

  addOnlineUser: (user: User) => void;

  disconnect: () => void;
}

interface Emits {
  receiveMessage: (payload: {
    user: User;
    text: string;
    createdAt: string;
  }) => void;

  receiveOnlineUsers: (onlineUsers: User[]) => void;
}

export interface ConversationsListens {
  SEND_MESSAGE: 'sendMessage';
  JOIN_CONVERSATION: 'joinConversation';
  LEAVE_CONVERSATION: 'leaveConversation';
  DISCONNECT: 'disconnect';
}

export interface ConversationsEmits {
  RECEIVE_MESSAGE: 'receiveMessage';
}

export interface UserListens {
  ADD_ONLINE_USER: 'addOnlineUser';
  DISCONNECT: 'disconnect';
}

export interface UserEmits {
  RECEIVE_ONLINE_USERS: 'receiveOnlineUsers';
}

export type SocketEmits = Server<Emits>;
export type SocketListens = Socket<Listens>;
