export interface Conversation {
  readonly _id: string;
  memberIds: string[];
  updatedAt: string;
}

export interface ConversationsInitState {
  conversations: Conversation[];
}

export interface CreateConversation {
  userId: string;
  receiverId: string;
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
