import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// lodash
import _ from 'lodash';

// types
import { GetUserResponse } from '@/models/users';
import {
  AuthInitState,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from '@/models/auth';

import { addLoading, removeLoading } from '@/helpers/loadings';

const loadings = {
  login: 'login',
  register: 'register',
};

export const initialState: AuthInitState = {
  loginStatus: {
    message: '',
    success: false,
    isAuthenticated: false,
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
      addLoading(state, loadings.login);
    },
    loginSuccess: (
      state,
      action: PayloadAction<LoginResponse | GetUserResponse>
    ) => {
      const { success, message } = action.payload;

      if (success) {
        state.loginStatus.isAuthenticated = true;
        state.loginStatus.success = true;

        removeLoading(state, loadings.login);
      } else {
        state.loginStatus.message = message;

        removeLoading(state, loadings.login);
      }
    },
    loginFailed: (state) => {
      removeLoading(state, loadings.login);
    },

    registerRequest: (state, action: PayloadAction<RegisterPayload>) => {
      addLoading(state, loadings.register);
    },
    registerSuccess(state, action: PayloadAction<RegisterResponse>) {
      const { success, message } = action.payload;

      if (success) {
        state.registerStatus.success = true;

        removeLoading(state, loadings.register);
      } else {
        state.registerStatus.message = message;

        removeLoading(state, loadings.register);
      }
    },
    registerFailed: (state) => {
      removeLoading(state, loadings.login);
    },

    clearMessage: (state) => {
      state.loginStatus.message = '';
      state.registerStatus.message = '';
    },
  },
});

export { loadings };

export const authActions = authSlice.actions;

export default authSlice.reducer;
