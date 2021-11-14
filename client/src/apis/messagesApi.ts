// types
import { AxiosError } from 'axios';
import {
  CreateMessageResponse,
  GetMessagesResponse,
  MessagePayload,
} from '@/models/messenger';

import { axiosClient } from './axiosClient';
import { notifyAxiosError } from '@/helpers/notifyError';

export const messagesApiClient = () => {
  const axiosInstance = axiosClient();

  return {
    createMessage: async (messageData: MessagePayload) => {
      try {
        const response = await axiosInstance.post<CreateMessageResponse>(
          '/messages',
          messageData
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Create message', error as AxiosError);
      }
    },

    getMessages: async (conversationId: string) => {
      try {
        const response = await axiosInstance.get<GetMessagesResponse>(
          '/messages/' + conversationId
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Get messages', error as AxiosError);
      }
    },
  };
};
