import { call, delay, put, takeLatest } from '@redux-saga/core/effects';

// types
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { FollowResponse, GetUserFriendsResponse } from '@/models/users';
import { PaginationParams } from '@/models/common';

import {
  addFollowingUser,
  deleteFollowingUser,
  setFetchedFriends,
} from '../slices/usersSlice';
import {
  followUser as followUserAct,
  unfollowUser as unfollowUserAct,
  getUserFriends as getUserFriendsAct,
} from '../actions/users';
import { DELAYS } from '@/constants';
import { usersApiClient } from '@/apis/usersApi';
import { notifySagaError } from '@/helpers/notify';

const { followUser, unfollowUser, getUserFriends } = usersApiClient();

function* handleFollowUser(action: PayloadAction<string>) {
  const userId = action.payload;

  try {
    yield delay(DELAYS.DEFAULT); // Block spam add friend button

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
    yield delay(DELAYS.DEFAULT); // Block spam unfriend button

    yield put(deleteFollowingUser(userId));

    const response: AxiosResponse<FollowResponse> = yield call(
      unfollowUser,
      userId
    );
  } catch (error) {
    notifySagaError('Unfollow user', error);
  }
}

function* handleGetUserFriends(
  action: PayloadAction<{ userId: string; params: PaginationParams }>
) {
  const { userId, params } = action.payload;

  try {
    const response: AxiosResponse<GetUserFriendsResponse> = yield call(
      getUserFriends,
      userId,
      params
    );

    yield put(setFetchedFriends(response.data));
  } catch (error) {
    notifySagaError('Get user friends', error);
  }
}

function* usersSaga() {
  yield takeLatest(followUserAct.request().type, handleFollowUser);
  yield takeLatest(unfollowUserAct.request().type, handleUnfollowUser);
  yield takeLatest(getUserFriendsAct.request().type, handleGetUserFriends);
}

export default usersSaga;
