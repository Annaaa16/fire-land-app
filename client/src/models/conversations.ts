export interface Conversation {
  readonly _id: string;
  memberIds: string[];
  updatedAt: string;
}

export interface GetConversationsResponse {
  success: boolean;
  message: string;
  conversations: Conversation[];
}

export interface ConversationsInitState {
  conversations: Conversation[];
}

export interface CreateConversation {
  userId: string;
  receiverId: string;
}
