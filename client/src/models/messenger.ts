export interface MessageData {
  conversationId: string;
  senderId: string;
  text: string;
}

export interface GetMessagesData {
  conversationId: string;
}

export interface Message {
  readonly _id?: string;
  conversationId?: string;
  senderId: string;
  text: string;
  updatedAt: string;
}

export interface MessengerInitState {
  currentChat: Message[];
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
