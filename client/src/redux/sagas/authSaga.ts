import { call, put, takeLatest } from 'redux-saga/effects';

// types
import { PayloadAction } from '@reduxjs/toolkit';
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from '@/models/auth';

import { authActions } from '../slices/authSlice';
import { authApiClient, authApiNext } from '@/apis/authApi';
import { userActions } from '../slices/usersSlice';

const { registerUser } = authApiClient();
const { loginUser } = authApiNext();

function* handleRegisterRequest(action: PayloadAction<RegisterPayload>) {
  try {
    const response: RegisterResponse = yield call(registerUser, action.payload);

    yield put(authActions.registerSuccess(response));
  } catch (error) {
    yield put(authActions.registerFailed());
  }
}

function* handleLoginRequest(action: PayloadAction<LoginPayload>) {
  try {
    const response: LoginResponse = yield call(loginUser, action.payload);

    yield put(authActions.loginSuccess(response));
    yield put(userActions.setCurrentUser(response));
  } catch (error) {
    yield put(authActions.loginFailed());
  }
}

function* authSaga() {
  yield takeLatest(authActions.loginRequest, handleLoginRequest);
  yield takeLatest(authActions.registerRequest, handleRegisterRequest);
}

export default authSaga;
