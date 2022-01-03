// types
import {
  CreateConversationPayload,
  CreateConversationResponse,
  DeleteConversationPayload,
  DeleteConversationResponse,
  GetConversationsPayload,
  GetConversationsResponse,
} from '@/models/conversations';

import { axiosClient } from './axiosClient';

export const conversationsApiClient = () => {
  const axiosInstance = axiosClient();

  return {
    createConversation(
      payload: CreateConversationPayload
    ): Promise<CreateConversationResponse> {
      return axiosInstance.post('/conversations/create', payload);
    },

    getConversations({
      userId,
    }: GetConversationsPayload): Promise<GetConversationsResponse> {
      return axiosInstance.get('/conversations/' + userId);
    },

    deleteConversation({
      conversationId,
    }: DeleteConversationPayload): Promise<DeleteConversationResponse> {
      return axiosInstance.delete('/conversations/' + conversationId);
    },
  };
};
