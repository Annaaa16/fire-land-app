// types
import { Loadings } from './common';

export interface MessagePayload {
  conversationId: string;
  senderId: string;
  text: string;
}

export interface Message {
  readonly _id?: string;
  conversationId?: string;
  senderId: string;
  text: string;
  updatedAt: string;
}

export interface MessengerInitState extends Loadings {
  messageContent: Message[];
  conversationId: string;
  receiverId: string;
}

export interface OnlineUser {
  userId: string;
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
