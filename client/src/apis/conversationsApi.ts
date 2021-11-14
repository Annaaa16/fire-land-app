// types
import { AxiosError } from 'axios';
import {
  CreateConversationPayload,
  CreateConversationResponse,
  DeleteConversationResponse,
  GetConversationsResponse,
} from '@/models/conversations';

import { axiosClient } from './axiosClient';
import { notifyAxiosError } from '@/helpers/notifyError';

export const conversationsApiClient = () => {
  const axiosInstance = axiosClient();

  return {
    createConversation: async (memberIds: CreateConversationPayload) => {
      try {
        const response = await axiosInstance.post<CreateConversationResponse>(
          '/conversations/create',
          memberIds
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Create conversation', error as AxiosError);
      }
    },

    getConversations: async (userId: string) => {
      try {
        const response = await axiosInstance.post<GetConversationsResponse>(
          '/conversations',
          { userId }
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Get conversations', error as AxiosError);
      }
    },

    deleteConversation: async (conversationId: string) => {
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
