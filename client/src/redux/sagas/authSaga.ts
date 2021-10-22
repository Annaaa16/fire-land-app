import { call, put, takeLatest } from 'redux-saga/effects';

// types
import { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  LoginFormData,
  LoginResponse,
  RegisterFormData,
  RegisterResponse,
} from '@/models/auth';

import { authApiClient } from '@/apis/authApi';
import { setRegisterStatus, setAuthStatus } from '../slices/authSlice';
import {
  loginUser as loginUserAct,
  registerUser as registerUserAct,
} from '../actions/auth';
import { notifySagaError } from '@/helpers/notify';
import cookies from '@/helpers/cookies';

const { loginUser, registerUser } = authApiClient();

function* handleLoginUser(action: PayloadAction<LoginFormData>) {
  try {
    const formData = action.payload;

    const response: AxiosResponse<LoginResponse> = yield call(
      loginUser,
      formData
    );

    const {
      data: { success, accessToken, refreshToken },
    } = response;

    if (success) {
      cookies.setAccessToken(accessToken);
      cookies.setRefreshToken(refreshToken);
    }

    yield put(setAuthStatus(response.data));
  } catch (error) {
    notifySagaError('Login', error);
  }
}

function* handleRegisterUser(action: PayloadAction<RegisterFormData>) {
  try {
    const formData = action.payload;

    const response: AxiosResponse<RegisterResponse> = yield call(
      registerUser,
      formData
    );

    yield put(setRegisterStatus(response.data));
  } catch (error) {
    notifySagaError('Register', error);
  }
}

function* authSaga() {
  yield takeLatest(loginUserAct.request().type, handleLoginUser);
  yield takeLatest(registerUserAct.request().type, handleRegisterUser);
}

export default authSaga;
