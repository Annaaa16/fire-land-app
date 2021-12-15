// types
import { AxiosError } from 'axios';
import {
  CreateConversationPayload,
  CreateConversationResponse,
  DeleteConversationPayload,
  DeleteConversationResponse,
  GetConversationsPayload,
  GetConversationsResponse,
} from '@/models/conversations';

import { axiosClient } from './axiosClient';
import { notifyAxiosError } from '@/helpers/notifyError';

export const conversationsApiClient = () => {
  const axiosInstance = axiosClient();

  return {
    createConversation: async (payload: CreateConversationPayload) => {
      try {
        const response = await axiosInstance.post<CreateConversationResponse>(
          '/conversations/create',
          payload
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Create conversation', error as AxiosError);
      }
    },

    getConversations: async ({ userId }: GetConversationsPayload) => {
      try {
        const response = await axiosInstance.get<GetConversationsResponse>(
          '/conversations/' + userId
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Get conversations', error as AxiosError);
      }
    },

    deleteConversation: async ({
      conversationId,
    }: DeleteConversationPayload) => {
      try {
        const response = await axiosInstance.delete<DeleteConversationResponse>(
          '/conversations/' + conversationId
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Delete conversation', error as AxiosError);
      }
    },
  };
};
