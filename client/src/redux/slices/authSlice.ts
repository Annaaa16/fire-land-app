import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// types
import { AuthInitState } from '../types/auth';
import { LoginResponse } from '@/types/login';
import { RegisterResponse } from '@/types/register';

const initialState: AuthInitState = {
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
});

export const { setUser, clearMessage, setRegisterStatus } = authSlice.actions;
export default authSlice.reducer;
