import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// next redux wrapper
import { HYDRATE } from 'next-redux-wrapper';

// types
import { AuthInitState } from '../types/auth';
import { LoginResponse } from '@/models/login';
import { RegisterResponse } from '@/models/register';

export const initialState: AuthInitState = {
  currentUser: {
    id: '',
    username: '',
    avatar: '',
    isAuthenticated: false,
    message: '',
    success: false,
  },
  registerStatus: {
    message: '',
    success: false,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<LoginResponse>) => {
      const { success, message, user } = action.payload;

      if (!success) {
        return {
          ...state,
          currentUser: { ...state.currentUser, message },
        };
      }

      return {
        ...state,
        currentUser: {
          id: user._id,
          username: user.username,
          avatar: user.avatar,
          isAuthenticated: true,
          message,
          success,
        },
      };
    },

    clearMessage: (state) => {
      state.currentUser.message = '';
      state.registerStatus.message = '';
    },

    setRegisterStatus(state, action: PayloadAction<RegisterResponse>) {
      const { success, message } = action.payload;

      return {
        ...state,
        registerStatus: { ...state.registerStatus, success, message },
      };
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return { ...state, ...action.payload.auth };
    },
  },
});

export const { setUser, clearMessage, setRegisterStatus } = authSlice.actions;
export default authSlice.reducer;
