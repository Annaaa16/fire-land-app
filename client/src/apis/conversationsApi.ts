// types
import { AxiosError } from 'axios';
import { CreateConversation } from '@/models/conversations';

import { axiosClient } from './axiosClient';
import cookies from '@/helpers/cookies';
import notifyServerError from '@/helpers/notifyServerError';

export const conversationsApiClient = () => {
  const refreshToken = cookies.getRefreshToken();
  const axiosInstance = axiosClient(refreshToken);

  return {
    reqCreateConversation: async (memberIds: CreateConversation) => {
      try {
        const response = await axiosInstance.post('/conversations', memberIds);

        return response;
      } catch (error) {
        return notifyServerError(error as AxiosError);
      }
    },

    reqGetConversations: async (userId: string) => {
      try {
        const response = await axiosInstance.get('/conversations/' + userId);

        return response;
      } catch (error) {
        return notifyServerError(error as AxiosError);
      }
    },
  };
};
