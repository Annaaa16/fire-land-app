import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// lodash
import _ from 'lodash';

// types
import {
  AddFriendUserPayload,
  AddFriendUserResponse,
  FollowUserPayload,
  GetFriendsPayload,
  GetUserFriendsResponse,
  GetUserResponse,
  SearchPeoplePayload,
  SearchPeopleResponse,
  UnfollowUserPayload,
  UnfollowUserResponse,
  UnfriendUserPayload,
  UnfriendUserResponse,
} from '@/models/users';
import { HydrateResponse } from '@/models/common';
import { LoginResponse } from '@/models/auth';
import { FollowUserResponse, UsersInitState } from '@/models/users';
import { OnlineUser } from '@/models/messenger';

// next redux wrapper
import { HYDRATE } from 'next-redux-wrapper';

import { addLoading, removeLoading } from '@/helpers/reduxStateLoadings';

export const actions = {
  addFriendUser: 'addFriendUser',
  unfriendUser: 'unfriendUser',
  followUser: 'followUser',
  unfollowUser: 'unfollowUser',
  getFriends: 'getFriends',
  searchPeople: 'searchPeople',
};

const initUser = {
  _id: '',
  username: '',
  avatar: '',
  friends: [],
  followings: [],
  followers: [],
  updatedAt: '',
  createdAt: '',
};

const initialState: UsersInitState = {
  currentUser: initUser,
  userProfile: initUser,
  onlineUsers: [],
  friends: [],
  loadings: [],
  searchedUsers: {
    prevPage: null,
    nextPage: null,
    total: 0,
    users: [],
  },
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
        state.currentUser = user;
      }
    },

    addFriendUserRequest: (
      state,
      action: PayloadAction<AddFriendUserPayload>
    ) => {
      addLoading(state, actions.addFriendUser);
    },
    addFriendUserSuccess: (
      state,
      action: PayloadAction<AddFriendUserResponse>
    ) => {
      const { success, user } = action.payload;

      if (success) {
        state.currentUser = user;
      }

      removeLoading(state, actions.addFriendUser);
    },
    addFriendUserFailed: (state) => {
      removeLoading(state, actions.addFriendUser);
    },

    searchPeopleRequest: (
      state,
      action: PayloadAction<SearchPeoplePayload>
    ) => {
      addLoading(state, actions.searchPeople);
    },
    searchPeopleSuccess: (
      state,
      action: PayloadAction<SearchPeopleResponse>
    ) => {
      const { success, users, prevPage, nextPage, total } = action.payload;

      if (success) {
        state.searchedUsers.users.push(...users);
        state.searchedUsers.prevPage = prevPage!;
        state.searchedUsers.nextPage = nextPage!;
        state.searchedUsers.total = total!;
      }

      removeLoading(state, actions.searchPeople);
    },
    searchPeopleFailed: (state) => {
      removeLoading(state, actions.searchPeople);
    },

    unfriendUserRequest: (
      state,
      action: PayloadAction<UnfriendUserPayload>
    ) => {
      addLoading(state, actions.unfriendUser);
    },
    unfriendUserSuccess: (
      state,
      action: PayloadAction<UnfriendUserResponse>
    ) => {
      const { success, user } = action.payload;

      if (success) {
        state.currentUser = user;
      }

      removeLoading(state, actions.unfriendUser);
    },
    unfriendUserFailed: (state) => {
      removeLoading(state, actions.unfriendUser);
    },

    followUserRequest: (state, action: PayloadAction<FollowUserPayload>) => {
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

    unfollowUserRequest: (
      state,
      action: PayloadAction<UnfollowUserPayload>
    ) => {
      addLoading(state, actions.unfollowUser);
    },
    unfollowUserSuccess: (
      state,
      action: PayloadAction<UnfollowUserResponse>
    ) => {
      const { success, userId } = action.payload;

      if (success) {
        _.remove(state.currentUser.followings, (n) => n === userId);
      }

      removeLoading(state, actions.unfollowUser);
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
      }

      removeLoading(state, actions.getFriends);
    },
    getFriendsFailed: (state) => {
      removeLoading(state, actions.getFriends);
    },

    setUserProfile: (state, action: PayloadAction<GetUserResponse>) => {
      const { user, success } = action.payload;

      if (success) {
        state.userProfile = user;
      }
    },

    clearSearchedResults(state) {
      return { ...state, searchedUsers: initialState.searchedUsers };
    },

    setOnlineUsers: (state, action: PayloadAction<OnlineUser[]>) => {
      state.onlineUsers = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action: PayloadAction<HydrateResponse>) => {
      return { ...state, ...action.payload.users };
    },
  },
});

export const userActions = usersSlice.actions;

export default usersSlice.reducer;
