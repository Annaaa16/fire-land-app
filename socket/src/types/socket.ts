// types
import type { Socket, Server } from 'socket.io';
import { User } from './common';
import { Notification } from './notifications';

// === Emit handlers ===
interface ConversationEmitHandlers {
  receiveMessage: (payload: {
    user: User;
    text: string;
    createdAt: string;
  }) => void;
}

interface UserEmitHandlers {
  receiveOnlineUsers: (onlineUsers: User[]) => void;
}

interface NotificationEmitHandlers {
  receiveNotification: (notification: Notification) => void;
}

// === Listen handlers ===
interface ConversationListenHandlers {
  sendMessage: (text: string) => void;
  joinConversation: (conversation: {
    user: User;
    conversationId: string;
  }) => void;
  leaveConversation: () => void;
}

interface UserListenHandlers {
  addOnlineUser: (user: User) => void;
}

interface NotificationListenHandlers {
  sendNotification: (notification: Notification) => void;
}

// === Listens ===
export interface ConversationsListens {
  SEND_MESSAGE: 'sendMessage';
  JOIN_CONVERSATION: 'joinConversation';
  LEAVE_CONVERSATION: 'leaveConversation';
  DISCONNECT: 'disconnect';
}

export interface UserListens {
  ADD_ONLINE_USER: 'addOnlineUser';
  DISCONNECT: 'disconnect';
}

export interface NotificationsListens {
  SEND_NOTIFICATION: 'sendNotification';
}

// === Emits ===
export interface ConversationsEmits {
  RECEIVE_MESSAGE: 'receiveMessage';
}

export interface UserEmits {
  RECEIVE_ONLINE_USERS: 'receiveOnlineUsers';
}

export interface NotificationsEmits {
  RECEIVE_NOTIFICATION: 'receiveNotification';
}

// === Handlers ===
export type EmitHandlers = ConversationEmitHandlers &
  UserEmitHandlers &
  NotificationEmitHandlers;

export type ListenHandlers = ConversationListenHandlers &
  UserListenHandlers &
  NotificationListenHandlers & {
    disconnect: () => void;
  };

// === Socket ===
export type SocketEmits = Server<EmitHandlers>;

export type SocketListens = Socket<ListenHandlers>;
