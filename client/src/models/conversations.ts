// types
import { Loadings, User } from './common';

export interface Conversation {
  readonly _id: string;
  creators: User[];
  members: User[];
  createdAt: string;
  updatedAt: string;
}

export interface ConversationsInitState extends Loadings {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  statusConversations: Conversation[];
}

export interface GetConversationsPayload {
  userId: string;
}

export interface CreateConversationPayload {
  senderId: string;
  receiverId: string;
}

export interface DeleteConversationPayload {
  conversationId: string;
}

// === Responses ===
export interface GetConversationsResponse {
  success: boolean;
  message: string;
  conversations: Conversation[];
}

export interface CreateConversationResponse {
  success: boolean;
  message: string;
  conversation: Conversation;
}

export interface DeleteConversationResponse {
  success: boolean;
  message: string;
  conversationId: string;
}
