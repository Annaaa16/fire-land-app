import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// lodash
import _ from 'lodash';

// types
import {
  AuthInitState,
  GetUserResponse,
  LoginResponse,
  RegisterResponse,
} from '@/models/auth';

export const initialState: AuthInitState = {
  authStatus: {
    message: '',
    success: false,
    isAuthenticated: false,
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
    setAuthStatus: (
      state,
      action: PayloadAction<LoginResponse | GetUserResponse>
    ) => {
      const { success, message } = action.payload;

      if (!success) {
        return {
          ...state,
          authStatus: { ...state.authStatus, message },
        };
      }

      return {
        ...state,
        authStatus: {
          success,
          message,
          isAuthenticated: true,
        },
      };
    },

    setRegisterStatus(state, action: PayloadAction<RegisterResponse>) {
      const { success, message } = action.payload;

      return {
        ...state,
        registerStatus: { ...state.registerStatus, success, message },
      };
    },

    clearMessage: (state) => {
      state.authStatus.message = '';
      state.registerStatus.message = '';
    },
  },
});

export const { setAuthStatus, clearMessage, setRegisterStatus } =
  authSlice.actions;

export default authSlice.reducer;
