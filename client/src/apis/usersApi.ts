// types
import { GetServerSidePropsContext, NextPageContext } from 'next';
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
import { axiosServer } from './axiosServer';

export const usersApiClient = () => {
  const axiosInstance = axiosClient();

  return {
    getCurrentUser(): Promise<GetUserResponse> {
      return axiosInstance.get('/users/current');
    },

    getUser(userId: string): Promise<GetUserResponse> {
      return axiosInstance.get('/users/' + userId);
    },

    addFriendUser({
      userId,
    }: AddFriendUserPayload): Promise<AddFriendUserResponse> {
      return axiosInstance.patch(`/users/${userId}/friend`);
    },

    unfriendUser({
      userId,
    }: UnfriendUserPayload): Promise<UnfriendUserResponse> {
      return axiosInstance.patch(`/users/${userId}/unfriend`);
    },

    followUser({ userId }: FollowUserPayload): Promise<FollowUserResponse> {
      return axiosInstance.patch(`/users/${userId}/follow`);
    },

    unfollowUser({
      userId,
    }: UnfollowUserPayload): Promise<UnfollowUserResponse> {
      return axiosInstance.patch(`/users/${userId}/unfollow`);
    },

    getFriends({
      userId,
      params,
    }: GetFriendsPayload): Promise<GetUserFriendsResponse> {
      return axiosInstance.get(`/users/${userId}/friends`, {
        params,
      });
    },
  };
};

export const usersApiServer = (
  ctx: GetServerSidePropsContext | NextPageContext
) => {
  const axiosInstance = axiosServer(ctx);

  return {
    getCurrentUser(): Promise<GetUserResponse> {
      return axiosInstance.get('/users/current');
    },

    getUser(userId: string): Promise<GetUserResponse> {
      return axiosInstance.get('/users/' + userId);
    },
  };
};
