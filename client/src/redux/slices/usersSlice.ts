import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// lodash
import _ from 'lodash';

// types
import { LoginResponse } from '@/models/auth';
import { GetUserResponse } from '@/models/users';
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
  },
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
  },
});

export const { setUser, addFollowingUser, deleteFollowingUser } =
  usersSlice.actions;

export default usersSlice.reducer;
