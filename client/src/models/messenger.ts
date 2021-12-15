// types
import { Loadings, User } from './common';

export interface CreateMessagePayload {
  conversationId: string;
  senderId: string;
  text: string;
}

export interface GetMessagesPayload {
  conversationId: string;
}

export interface Message {
  readonly _id?: string;
  conversationId?: string;
  user: User;
  text: string;
  createdAt: string;
  updatedAt?: string;
}

export interface MessengerInitState extends Loadings {
  messages: Message[];
  conversationId: string;
  receiverId: string;
}

export interface OnlineUser extends User {
  conversationId: string;
  socketId: string;
}

// === Responses ===
export interface CreateMessageResponse {
  success: boolean;
  message: Message;
}

export interface GetMessagesResponse {
  success: boolean;
  messages: Message[];
  conversationId: string;
}
