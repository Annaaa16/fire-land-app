// types
import { AxiosError } from 'axios';
import { FollowResponse, UnfollowResponse } from '@/models/users';
import { GetUserResponse } from '@/models/auth';

import { axiosClient } from './axiosClient';
import { axiosServer } from './axiosServer';
import { notifyAxiosError } from '@/helpers/notify';
import cookies from '@/helpers/cookies';

export const usersApiClient = () => {
  const refreshToken = cookies.getRefreshToken();

  const axiosInstance = axiosClient(refreshToken);

  return {
    getCurrentUser: async () => {
      try {
        const response = await axiosInstance.get<GetUserResponse>(
          '/users/current'
        );

        return response;
      } catch (error) {
        notifyAxiosError('Get current user', error as AxiosError);
      }
    },

    getUserById: async (userId: string) => {
      try {
        const response = await axiosInstance.get<GetUserResponse>(
          '/users/' + userId
        );

        return response;
      } catch (error) {
        notifyAxiosError('Get user by ID', error as AxiosError);
      }
    },

    followUser: async (userId: string) => {
      try {
        const response = await axiosInstance.patch<FollowResponse>(
          `/users/${userId}/follow`
        );

        return response;
      } catch (error) {
        notifyAxiosError('Follow user', error as AxiosError);
      }
    },

    unfollowUser: async (userId: string) => {
      try {
        const response = await axiosInstance.patch<UnfollowResponse>(
          `/users/${userId}/unfollow`
        );

        return response;
      } catch (error) {
        notifyAxiosError('Unfollow user', error as AxiosError);
      }
    },
  };
};

export const usersApiServer = (accessToken: string) => {
  const axiosInstance = axiosServer(accessToken);

  return {
    getCurrentUser: async () => {
      try {
        const response = await axiosInstance.get<GetUserResponse>(
          '/users/current'
        );

        return response;
      } catch (error) {
        notifyAxiosError('Get current user', error as AxiosError);
      }
    },
  };
};
