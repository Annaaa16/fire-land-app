import { call, delay, put, takeLatest } from '@redux-saga/core/effects';

// types
import {
  FollowUserResponse,
  GetFriendsPayload,
  GetUserFriendsResponse,
  UnfollowUserResponse,
} from '@/models/users';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { DELAYS } from '@/constants';
import { usersActions } from '../slices/usersSlice';
import { usersApiClient } from '@/apis/usersApi';
import { notifySagaError } from '@/helpers/notifyError';

const { followUser, unfollowUser, getFriends } = usersApiClient();

function* handleFollowUserRequest(action: PayloadAction<string>) {
  const userId = action.payload;

  try {
    yield delay(DELAYS.DEFAULT); // Block spam add friend button

    const response: AxiosResponse<FollowUserResponse> = yield call(
      followUser,
      userId
    );

    yield put(usersActions.followUserSuccess(response.data));
  } catch (error) {
    notifySagaError(usersActions.followUserFailed, error);
    yield put(usersActions.followUserFailed());
  }
}

function* handleUnfollowUserRequest(action: PayloadAction<string>) {
  const userId = action.payload;

  try {
    yield delay(DELAYS.DEFAULT); // Block spam unfriend button

    const response: AxiosResponse<UnfollowUserResponse> = yield call(
      unfollowUser,
      userId
    );

    yield put(usersActions.unfollowUserSuccess(response.data));
  } catch (error) {
    notifySagaError(usersActions.unfollowUserFailed, error);
    yield put(usersActions.unfollowUserFailed());
  }
}

function* handleGetFriendsRequest(action: PayloadAction<GetFriendsPayload>) {
  const { userId, params } = action.payload;

  try {
    const response: AxiosResponse<GetUserFriendsResponse> = yield call(
      getFriends,
      userId,
      params
    );

    yield put(usersActions.getFriendsSuccess(response.data));
  } catch (error) {
    notifySagaError(usersActions.getFriendsFailed, error);
    yield put(usersActions.getFriendsFailed());
  }
}

function* usersSaga() {
  yield takeLatest(usersActions.followUserRequest, handleFollowUserRequest);
  yield takeLatest(usersActions.unfollowUserRequest, handleUnfollowUserRequest);
  yield takeLatest(usersActions.getFriendsRequest, handleGetFriendsRequest);
}

export default usersSaga;
