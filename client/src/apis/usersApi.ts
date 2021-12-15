// types
import { GetServerSidePropsContext, NextPageContext } from 'next';
import { AxiosError } from 'axios';
import {
  AddFriendUserPayload,
  AddFriendUserResponse,
  FollowUserPayload,
  FollowUserResponse,
  GetFriendsPayload,
  GetUserFriendsResponse,
  GetUserResponse,
  UnfollowUserPayload,
  UnfollowUserResponse,
  UnfriendUserPayload,
  UnfriendUserResponse,
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

    addFriendUser: async ({ userId }: AddFriendUserPayload) => {
      try {
        const response = await axiosInstance.patch<AddFriendUserResponse>(
          `/users/${userId}/friend`
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Add friend user', error as AxiosError);
      }
    },

    unfriendUser: async ({ userId }: UnfriendUserPayload) => {
      try {
        const response = await axiosInstance.patch<UnfriendUserResponse>(
          `/users/${userId}/unfriend`
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Unfriend user', error as AxiosError);
      }
    },

    followUser: async ({ userId }: FollowUserPayload) => {
      try {
        const response = await axiosInstance.patch<FollowUserResponse>(
          `/users/${userId}/follow`
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Follow user', error as AxiosError);
      }
    },

    unfollowUser: async ({ userId }: UnfollowUserPayload) => {
      try {
        const response = await axiosInstance.patch<UnfollowUserResponse>(
          `/users/${userId}/unfollow`
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Unfollow user', error as AxiosError);
      }
    },

    getFriends: async ({ userId, params }: GetFriendsPayload) => {
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
