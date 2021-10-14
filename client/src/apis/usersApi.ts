import { AxiosError } from 'axios';

import { axiosClient } from './axiosClient';
import notifyServerError from '@/helpers/notifyServerError';
import cookies from '@/helpers/cookies';

export const usersApiClient = () => {
  const refreshToken = cookies.getRefreshToken();

  const axiosInstance = axiosClient(refreshToken);

  return {
    reqFollowUser: async (userId: string) => {
      try {
        const response = await axiosInstance.patch(`/users/${userId}/follow`);

        return response;
      } catch (error) {
        return notifyServerError(error as AxiosError);
      }
    },

    reqUnfollowUser: async (userId: string) => {
      try {
        const response = await axiosInstance.patch(`/users/${userId}/unfollow`);

        return response;
      } catch (error) {
        return notifyServerError(error as AxiosError);
      }
    },
  };
};
