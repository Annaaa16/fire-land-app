import { call, delay, put, takeLatest } from '@redux-saga/core/effects';

// types
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { FollowResponse } from '@/models/users';

import { usersApiClient } from '@/apis/usersApi';
import { notifySagaError } from '@/helpers/notify';
import { GetUserResponse } from '@/models/auth';
import { setAuthStatus } from '../slices/authSlice';
import {
  getCurrentUser as getCurrentUserAct,
  followUser as followUserAct,
  unfollowUser as unfollowUserAct,
} from '../actions/users';
import {
  addFollowingUser,
  deleteFollowingUser,
  setUser,
} from '../slices/usersSlice';

const { getCurrentUser, followUser, unfollowUser } = usersApiClient();

function* handleGetCurrentUser() {
  try {
    const response: AxiosResponse<GetUserResponse> = yield call(getCurrentUser);

    yield put(setAuthStatus(response.data));
    yield put(setUser(response.data));
  } catch (error) {
    notifySagaError('Get current user', error);
  }
}

function* handleFollowUser(action: PayloadAction<string>) {
  const userId = action.payload;

  try {
    yield delay(300); // Block spam follow button

    const response: AxiosResponse<FollowResponse> = yield call(
      followUser,
      userId
    );

    yield put(addFollowingUser(response.data));
  } catch (error) {
    notifySagaError('Follow user', error);
  }
}

function* handleUnfollowUser(action: PayloadAction<string>) {
  const userId = action.payload;

  try {
    yield delay(300); // Block spam unfollow button

    const response: AxiosResponse<FollowResponse> = yield call(
      unfollowUser,
      userId
    );

    yield put(deleteFollowingUser(response.data));
  } catch (error) {
    notifySagaError('Unfollow user', error);
  }
}

function* usersSaga() {
  yield takeLatest(getCurrentUserAct.request().type, handleGetCurrentUser);
  yield takeLatest(followUserAct.request().type, handleFollowUser);
  yield takeLatest(unfollowUserAct.request().type, handleUnfollowUser);
}

export default usersSaga;
