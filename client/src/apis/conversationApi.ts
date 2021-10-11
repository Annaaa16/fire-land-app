// types
import { AxiosError } from 'axios';

import { axiosClient } from './axiosClient';
import cookies from '@/helpers/cookies';
import notifyServerError from '@/helpers/notifyServerError';

export const conversationApiClient = () => {
  const refreshToken = cookies.getRefreshToken();
  const axiosInstance = axiosClient(refreshToken);

  return {
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
