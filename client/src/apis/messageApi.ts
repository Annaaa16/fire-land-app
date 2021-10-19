// types
import { AxiosError } from 'axios';
import {
  CreateMessageResponse,
  GetMessagesResponse,
  MessageData,
} from '@/models/messenger';

import { axiosClient } from './axiosClient';
import cookies from '@/helpers/cookies';
import notifyServerError from '@/helpers/notifyServerError';

export const messageApiClient = () => {
  const refreshToken = cookies.getRefreshToken();
  const axiosInstance = axiosClient(refreshToken);

  return {
    createMessage: async (messageData: MessageData) => {
      try {
        const response = await axiosInstance.post<CreateMessageResponse>(
          '/messages',
          messageData
        );

        return response;
      } catch (error) {
        return notifyServerError('Create message', error as AxiosError);
      }
    },
    getMessages: async (conversationId: string) => {
      try {
        const response = await axiosInstance.get<GetMessagesResponse>(
          '/messages/' + conversationId
        );

        return response;
      } catch (error) {
        return notifyServerError('Get messages', error as AxiosError);
      }
    },
  };
};
