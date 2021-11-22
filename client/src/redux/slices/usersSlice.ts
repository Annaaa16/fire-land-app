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

import { addLoading, removeLoading } from '@/helpers/reduxStateLoadings';

const user = {
  _id: '',
  username: '',
  avatar: '',
  followings: [],
  followers: [],
  createdAt: '',
};

const actions = {
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
      addLoading(state, actions.followUser);
    },
    followUserSuccess: (state, action: PayloadAction<FollowUserResponse>) => {
      const { success, userId } = action.payload;

      if (success) {
        state.currentUser.followings.push(userId);

        removeLoading(state, actions.followUser);
      }
    },
    followUserFailed: (state) => {
      removeLoading(state, actions.followUser);
    },

    unfollowUserRequest: (state, action: PayloadAction<string>) => {
      addLoading(state, actions.unfollowUser);
    },
    unfollowUserSuccess: (
      state,
      action: PayloadAction<UnfollowUserResponse>
    ) => {
      const { success, userId } = action.payload;

      if (success) {
        _.remove(state.currentUser.followings, (n) => n === userId);

        removeLoading(state, actions.unfollowUser);
      }
    },
    unfollowUserFailed: (state) => {
      removeLoading(state, actions.unfollowUser);
    },

    getFriendsRequest: (state, action: PayloadAction<GetFriendsPayload>) => {
      addLoading(state, actions.getFriends);
    },
    getFriendsSuccess: (
      state,
      action: PayloadAction<GetUserFriendsResponse>
    ) => {
      const { success, friends } = action.payload;

      if (success) {
        state.friends = friends;

        removeLoading(state, actions.getFriends);
      }
    },
    getFriendsFailed: (state) => {
      removeLoading(state, actions.getFriends);
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

export { actions };

export const usersActions = usersSlice.actions;

export default usersSlice.reducer;
