// types
import { AxiosError } from 'axios';
import { MessageData } from '@/models/messenger';

import { axiosClient } from './axiosClient';
import cookies from '@/helpers/cookies';
import notifyServerError from '@/helpers/notifyServerError';

export const messageApiClient = () => {
  const refreshToken = cookies.getRefreshToken();
  const axiosInstance = axiosClient(refreshToken);

  return {
    reqCreateMessage: async (messageData: MessageData) => {
      try {
        const response = await axiosInstance.post('/messages', messageData);

        return response;
      } catch (error) {
        return notifyServerError(error as AxiosError);
      }
    },
    reqGetMessages: async (conversationId: string) => {
      try {
        const response = await axiosInstance.get('/messages/' + conversationId);

        return response;
      } catch (error) {
        return notifyServerError(error as AxiosError);
      }
    },
  };
};
