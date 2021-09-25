import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';

// types
import { LoginFormData, LoginResponse } from '@/types/login';
import { RegisterResponse } from '@/types/register';
import { RegisterFormData } from '@/types/register';
import { AxiosResponse } from 'axios';

import { reqLoginUser, reqRegisterUser } from '@/apis/authApi';
import { setRegisterStatus, setUser } from '../slices/authSlice';
import { loginUser, registerUser } from '../actions/auth';

function* handleReqLoginUser(action: PayloadAction<LoginFormData>) {
  try {
    const formData = action.payload;

    const response: AxiosResponse<LoginResponse> = yield call(
      reqLoginUser,
      formData
    );

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
  yield takeLatest(loginUser().type, handleReqLoginUser);
  yield takeLatest(registerUser().type, handleReqRegisterUser);
}

export default authSaga;
