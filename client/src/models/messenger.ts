// types
import { Loadings, User } from './common';

export interface CreateMessagePayload {
  readonly conversationId: string;
  senderId: string;
  text: string;
}

export interface GetMessagesPayload {
  readonly conversationId: string;
}

export interface Message {
  readonly _id?: string;
  readonly conversationId?: string;
  user: User;
  text: string;
  createdAt: string;
  updatedAt?: string;
}

export interface MessengerInitState extends Loadings {
  messages: Message[];
  conversationId: string;
  receiverId: string;
  lastMessages: Message[];
}

export interface OnlineUser extends User {
  readonly conversationId: string;
  socketId: string;
}

// === Responses ===
export interface CreateMessageResponse {
  success: boolean;
  message: Message;
}

export interface GetMessagesResponse {
  readonly conversationId: string;
  success: boolean;
  messages: Message[];
}
