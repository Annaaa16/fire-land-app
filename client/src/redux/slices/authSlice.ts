import { createSlice } from '@reduxjs/toolkit';

// lodash
import _ from 'lodash';

// types
import { GetUserResponse } from '@/models/users';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  AuthInitState,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from '@/models/auth';

import { addLoading, removeLoading } from '@/helpers/reduxStateLoadings';

export const actions = {
  login: 'login',
  register: 'register',
};

export const initialState: AuthInitState = {
  loginStatus: {
    message: '',
    success: false,
  },
  registerStatus: {
    message: '',
    success: false,
  },
  loadings: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state, action: PayloadAction<LoginPayload>) => {
      addLoading(state, actions.login);
    },
    loginSuccess: (
      state,
      action: PayloadAction<LoginResponse | GetUserResponse>
    ) => {
      const { success, message } = action.payload;

      if (success) {
        state.loginStatus.success = true;

        removeLoading(state, actions.login);
      } else {
        state.loginStatus.message = message;

        removeLoading(state, actions.login);
      }
    },
    loginFailed: (state) => {
      removeLoading(state, actions.login);
    },

    registerRequest: (state, action: PayloadAction<RegisterPayload>) => {
      addLoading(state, actions.register);
    },
    registerSuccess(state, action: PayloadAction<RegisterResponse>) {
      const { success, message } = action.payload;

      if (success) {
        state.registerStatus.success = true;

        removeLoading(state, actions.register);
      } else {
        state.registerStatus.message = message;

        removeLoading(state, actions.register);
      }
    },
    registerFailed: (state) => {
      removeLoading(state, actions.login);
    },

    clearMessage: (state) => {
      state.loginStatus.message = '';
      state.registerStatus.message = '';
    },

    setLoginStatus: (state, action: PayloadAction<boolean>) => {
      state.loginStatus.success = action.payload;
    },

    setRegisterStatus: (state, action: PayloadAction<boolean>) => {
      state.registerStatus.success = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
