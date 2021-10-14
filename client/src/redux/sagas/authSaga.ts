import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';

// types
import {
  LoginFormData,
  LoginResponse,
  RegisterFormData,
  RegisterResponse,
} from '@/models/auth';
import { AxiosResponse } from 'axios';

import { authApiClient } from '@/apis/authApi';
import { setRegisterStatus, setUser } from '../slices/authSlice';
import { loginUser, registerUser } from '../actions/auth';
import cookies from '@/helpers/cookies';

const { reqLoginUser, reqRegisterUser } = authApiClient();

function* handleReqLoginUser(action: PayloadAction<LoginFormData>) {
  try {
    const formData = action.payload;

    const response: AxiosResponse<LoginResponse> = yield call(
      reqLoginUser,
      formData
    );

    const {
      data: { accessToken, refreshToken },
    } = response;

    cookies.setAccessToken(accessToken);
    cookies.setRefreshToken(refreshToken);

    yield put(setUser(response.data));
  } catch (error) {
    console.log('Login error 👉', error);
  }
}

function* handleReqRegisterUser(action: PayloadAction<RegisterFormData>) {
  try {
    const formData = action.payload;

    const response: AxiosResponse<RegisterResponse> = yield call(
      reqRegisterUser,
      formData
    );

    yield put(setRegisterStatus(response.data));
  } catch (error) {
    console.log('Register error 👉', error);
  }
}

function* authSaga() {
  yield takeLatest(loginUser.request().type, handleReqLoginUser);
  yield takeLatest(registerUser.request().type, handleReqRegisterUser);
}

export default authSaga;
