// types
import { Socket } from 'socket.io-client';
import { User } from './common';
import { SocketNotification } from './common';
import { OnlineUser } from './messenger';

// === Emit handlers ===
export interface ConversationsEmitHandlers {
  sendMessage: (text: string) => void;
  joinConversation: (conversation: {
    user: User;
    conversationId: string;
  }) => void;
  leaveConversation: () => void;
}

export interface UserEmitHandlers {
  addOnlineUser: (user: User) => void;
}

export interface NotificationEmitHandlers {
  sendNotification: (notification: SocketNotification) => void;
}

// === Listen handlers ===
interface ConversationListenHandlers {
  receiveMessage: (payload: {
    user: User;
    text: string;
    createdAt: string;
  }) => void;
}

interface UserListenHandlers {
  receiveOnlineUsers: (onlineUsers: OnlineUser[]) => void;
}

interface NotificationListenHandlers {
  receiveNotification: (notification: SocketNotification) => void;
}

// === Listens ===
interface ConversationsListens {
  RECEIVE_MESSAGE: 'receiveMessage';
}

interface UserListens {
  RECEIVE_ONLINE_USERS: 'receiveOnlineUsers';
}

interface NotificationsListens {
  RECEIVE_NOTIFICATION: 'receiveNotification';
}

// === Emits ===
interface ConversationsEmits {
  SEND_MESSAGE: 'sendMessage';
  JOIN_CONVERSATION: 'joinConversation';
  LEAVE_CONVERSATION: 'leaveConversation';
  DISCONNECT: 'disconnect';
}

interface UserEmits {
  ADD_ONLINE_USER: 'addOnlineUser';
  DISCONNECT: 'disconnect';
}

interface NotificationsEmits {
  SEND_NOTIFICATION: 'sendNotification';
}

// === Handlers ===
type EmitHandlers = ConversationsEmitHandlers &
  UserEmitHandlers &
  NotificationEmitHandlers & {
    disconnect: () => void;
  };

type ListenHandlers = ConversationListenHandlers &
  UserListenHandlers &
  NotificationListenHandlers;

// === Socket ===
export type SocketListens = ConversationsListens &
  UserListens &
  NotificationsListens;

export type SocketEmits = ConversationsEmits & UserEmits & NotificationsEmits;

export type SocketEvents = Socket<ListenHandlers, EmitHandlers>;
