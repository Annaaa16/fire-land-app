// types
import { PaginationParams } from '@/models/common';

export const followUser = {
  request: (payload?: string) => ({
    type: 'followUser/request',
    payload,
  }),
  success: () => ({
    type: 'followUser/success',
  }),
  failure: () => ({
    type: 'followUser/failure',
  }),
};

export const unfollowUser = {
  request: (payload?: string) => ({
    type: 'unfollowUser/request',
    payload,
  }),
  success: () => ({
    type: 'unfollowUser/success',
  }),
  failure: () => ({
    type: 'unfollowUser/failure',
  }),
};

export const getUserFriends = {
  request: (payload?: { userId: string; params: PaginationParams }) => ({
    type: 'getUserFriends/request',
    payload,
  }),
  success: () => ({
    type: 'getUserFriends/success',
  }),
  failure: () => ({
    type: 'getUserFriends/failure',
  }),
};
