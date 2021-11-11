import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// lodash
import _ from 'lodash';

// types
import { LoginResponse } from '@/models/auth';
import { GetUserFriendsResponse, GetUserResponse } from '@/models/users';
import { HydrateResponse } from '@/models/common';
import { HYDRATE } from 'next-redux-wrapper';
import {
  FollowResponse,
  UnfollowResponse,
  UsersInitState,
} from '@/models/users';

export const initialState: UsersInitState = {
  currentUser: {
    _id: '',
    username: '',
    avatar: '',
    followings: [],
    followers: [],
    createdAt: '',
  },
  userProfile: {
    _id: '',
    username: '',
    avatar: '',
    followings: [],
    followers: [],
    createdAt: '',
  },
  fetchedFriends: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (
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

    addFollowingUser: (state, action: PayloadAction<FollowResponse>) => {
      const { success, userId } = action.payload;

      if (success) state.currentUser.followings.push(userId);
    },

    deleteFollowingUser: (state, action: PayloadAction<UnfollowResponse>) => {
      const { success, userId } = action.payload;

      if (success) _.remove(state.currentUser.followings, (n) => n === userId);
    },

    setFetchedFriends: (
      state,
      action: PayloadAction<GetUserFriendsResponse>
    ) => {
      const { success, friends } = action.payload;

      if (success) {
        state.fetchedFriends = friends;
      }
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

export const {
  setUser,
  addFollowingUser,
  deleteFollowingUser,
  setFetchedFriends,
  setUserProfile,
} = usersSlice.actions;

export default usersSlice.reducer;
