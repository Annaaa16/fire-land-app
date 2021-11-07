// types
import { AxiosError } from 'axios';
import {
  CreateConversation,
  CreateConversationResponse,
  GetConversationsResponse,
} from '@/models/conversations';

import { axiosClient } from './axiosClient';
import { notifyAxiosError } from '@/helpers/notify';

export const conversationsApiClient = () => {
  const axiosInstance = axiosClient();

  return {
    createConversation: async (memberIds: CreateConversation) => {
      try {
        const response = await axiosInstance.post<CreateConversationResponse>(
          '/conversations',
          memberIds
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Create conversation', error as AxiosError);
      }
    },

    getConversations: async (userId: string) => {
      try {
        const response = await axiosInstance.get<GetConversationsResponse>(
          '/conversations/' + userId
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Get conversations', error as AxiosError);
      }
    },
  };
};
