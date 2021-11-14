// types
import { GetServerSidePropsContext, NextPageContext } from 'next';
import { AxiosError } from 'axios';
import { PaginationParams } from '@/models/common';
import {
  FollowUserResponse,
  GetUserFriendsResponse,
  GetUserResponse,
  UnfollowUserResponse,
} from '@/models/users';

import { axiosClient } from './axiosClient';
import { notifyAxiosError } from '@/helpers/notifyError';
import { axiosServer } from './axiosServer';

export const usersApiClient = () => {
  const axiosInstance = axiosClient();

  return {
    getCurrentUser: async () => {
      try {
        const response = await axiosInstance.get<GetUserResponse>(
          '/users/current'
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Get current user', error as AxiosError);
      }
    },

    getUser: async (userId: string) => {
      try {
        const response = await axiosInstance.get<GetUserResponse>(
          '/users/' + userId
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Get user by ID', error as AxiosError);
      }
    },

    followUser: async (userId: string) => {
      try {
        const response = await axiosInstance.patch<FollowUserResponse>(
          `/users/${userId}/follow`
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Follow user', error as AxiosError);
      }
    },

    unfollowUser: async (userId: string) => {
      try {
        const response = await axiosInstance.patch<UnfollowUserResponse>(
          `/users/${userId}/unfollow`
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Unfollow user', error as AxiosError);
      }
    },

    getFriends: async (userId: string, params: PaginationParams) => {
      try {
        const response = await axiosInstance.get<GetUserFriendsResponse>(
          `/users/${userId}/friends`,
          { params }
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Get user friends', error as AxiosError);
      }
    },
  };
};

export const usersApiServer = (
  ctx: GetServerSidePropsContext | NextPageContext
) => {
  const axiosInstance = axiosServer(ctx);

  return {
    getCurrentUser: async () => {
      try {
        const response = await axiosInstance.get<GetUserResponse>(
          '/users/current'
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Get current user', error as AxiosError);
      }
    },

    getUser: async (userId: string) => {
      try {
        const response = await axiosInstance.get<GetUserResponse>(
          '/users/' + userId
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Get user by ID', error as AxiosError);
      }
    },
  };
};
