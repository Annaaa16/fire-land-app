import { call, put, takeLatest } from 'redux-saga/effects';

// types
import { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from '@/models/auth';

import { authActions } from '../slices/authSlice';
import { authApiClient } from '@/apis/authApi';
import { notifySagaError } from '@/helpers/notifyError';
import { usersActions } from '../slices/usersSlice';

const { loginUser, registerUser } = authApiClient();

function* handleLoginRequest(action: PayloadAction<LoginPayload>) {
  try {
    const response: AxiosResponse<LoginResponse> = yield call(
      loginUser,
      action.payload
    );

    yield put(authActions.loginSuccess(response.data));
    yield put(usersActions.setCurrentUser(response.data));
  } catch (error) {
    notifySagaError(authActions.loginFailed, error);
    yield put(authActions.loginFailed());
  }
}

function* handleRegisterRequest(action: PayloadAction<RegisterPayload>) {
  try {
    const response: AxiosResponse<RegisterResponse> = yield call(
      registerUser,
      action.payload
    );

    yield put(authActions.registerSuccess(response.data));
  } catch (error) {
    notifySagaError(authActions.registerFailed, error);
    yield put(authActions.registerFailed());
  }
}

function* authSaga() {
  yield takeLatest(authActions.loginRequest, handleLoginRequest);
  yield takeLatest(authActions.registerRequest, handleRegisterRequest);
}

export default authSaga;
