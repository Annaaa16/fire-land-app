import { call, delay, put, takeLatest } from '@redux-saga/core/effects';

// types
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { FollowResponse } from '@/models/users';

import { usersApiClient } from '@/apis/usersApi';
import { followUser, unfollowUser } from '../actions/users';
import { addFollowingUser, deleteFollowingUser } from '../slices/authSlice';

const { reqFollowUser, reqUnfollowUser } = usersApiClient();

function* handleReqFollowUser(action: PayloadAction<string>) {
  const userId = action.payload;

  try {
    yield delay(300); // Block spam follow button

    const response: AxiosResponse<FollowResponse> = yield call(
      reqFollowUser,
      userId
    );

    yield put(addFollowingUser(response.data));
  } catch (error) {
    console.log('Follow user error 👉', error);
  }
}

function* handleReqUnfollowUser(action: PayloadAction<string>) {
  const userId = action.payload;

  try {
    yield delay(300); // Block spam unfollow button

    const response: AxiosResponse<FollowResponse> = yield call(
      reqUnfollowUser,
      userId
    );

    yield put(deleteFollowingUser(response.data));
  } catch (error) {
    console.log('Unfollow user error 👉', error);
  }
}

function* usersSaga() {
  yield takeLatest(followUser.request().type, handleReqFollowUser);
  yield takeLatest(unfollowUser.request().type, handleReqUnfollowUser);
}

export default usersSaga;
