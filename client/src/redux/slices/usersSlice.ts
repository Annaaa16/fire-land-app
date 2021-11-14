import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// lodash
import _ from 'lodash';

// types
import {
  GetFriendsPayload,
  GetUserFriendsResponse,
  GetUserResponse,
  UnfollowUserResponse,
} from '@/models/users';
import { HydrateResponse } from '@/models/common';
import { LoginResponse } from '@/models/auth';
import { FollowUserResponse, UsersInitState } from '@/models/users';

// next redux wrapper
import { HYDRATE } from 'next-redux-wrapper';

import { addLoading, removeLoading } from '@/helpers/loadings';

const user = {
  _id: '',
  username: '',
  avatar: '',
  followings: [],
  followers: [],
  createdAt: '',
};

const loadings = {
  followUser: 'followUser',
  unfollowUser: 'unfollowUser',
  getFriends: 'getFriends',
};

export const initialState: UsersInitState = {
  currentUser: user,
  userProfile: user,
  friends: [],
  loadings: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUser: (
      state,
      action: PayloadAction<LoginResponse | GetUserResponse>
    ) => {
      const { user, success } = action.payload;

      if (success) {
        return {
          ...state,
          currentUser: {
            _id: user._id,
            username: user.username,
            avatar: user.avatar,
            followings: user.followings,
            followers: user.followers,
            createdAt: user.createdAt,
          },
        };
      }
    },

    followUserRequest: (state, action: PayloadAction<string>) => {
      addLoading(state, loadings.followUser);
    },
    followUserSuccess: (state, action: PayloadAction<FollowUserResponse>) => {
      const { success, userId } = action.payload;

      if (success) {
        state.currentUser.followings.push(userId);

        removeLoading(state, loadings.followUser);
      }
    },
    followUserFailed: (state) => {
      removeLoading(state, loadings.followUser);
    },

    unfollowUserRequest: (state, action: PayloadAction<string>) => {
      addLoading(state, loadings.unfollowUser);
    },
    unfollowUserSuccess: (
      state,
      action: PayloadAction<UnfollowUserResponse>
    ) => {
      const { success, userId } = action.payload;

      if (success) {
        _.remove(state.currentUser.followings, (n) => n === userId);

        removeLoading(state, loadings.unfollowUser);
      }
    },
    unfollowUserFailed: (state) => {
      removeLoading(state, loadings.unfollowUser);
    },

    getFriendsRequest: (state, action: PayloadAction<GetFriendsPayload>) => {
      addLoading(state, loadings.getFriends);
    },
    getFriendsSuccess: (
      state,
      action: PayloadAction<GetUserFriendsResponse>
    ) => {
      const { success, friends } = action.payload;

      if (success) {
        state.friends = friends;

        removeLoading(state, loadings.getFriends);
      }
    },
    getFriendsFailed: (state) => {
      removeLoading(state, loadings.getFriends);
    },

    setUserProfile: (state, action: PayloadAction<GetUserResponse>) => {
      const { user, success } = action.payload;

      if (success) {
        return {
          ...state,
          userProfile: {
            _id: user._id,
            username: user.username,
            avatar: user.avatar,
            followings: user.followings,
            followers: user.followers,
            createdAt: user.createdAt,
          },
        };
      }
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action: PayloadAction<HydrateResponse>) => {
      return { ...state, ...action.payload.users };
    },
  },
});

export { loadings };

export const usersActions = usersSlice.actions;

export default usersSlice.reducer;
