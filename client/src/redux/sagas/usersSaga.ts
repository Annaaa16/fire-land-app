import { call, delay, put, takeLatest } from '@redux-saga/core/effects';

// types
import {
  AddFriendUserPayload,
  AddFriendUserResponse,
  FollowUserPayload,
  FollowUserResponse,
  GetFriendsPayload,
  GetUserFriendsResponse,
  UnfollowUserPayload,
  UnfollowUserResponse,
  UnfriendUserPayload,
  UnfriendUserResponse,
} from '@/models/users';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { DELAYS } from '@/constants';
import { usersActions } from '../slices/usersSlice';
import { usersApiClient } from '@/apis/usersApi';
import { notifySagaError } from '@/helpers/notifyError';

const { addFriendUser, unfriendUser, followUser, unfollowUser, getFriends } =
  usersApiClient();

function* handleAddFriendUserRequest(
  action: PayloadAction<AddFriendUserPayload>
) {
  try {
    yield delay(DELAYS.DEFAULT); // Block spam add friend button

    const response: AxiosResponse<AddFriendUserResponse> = yield call(
      addFriendUser,
      action.payload
    );

    yield put(usersActions.addFriendUserSuccess(response.data));
  } catch (error) {
    notifySagaError(usersActions.addFriendUserFailed, error);
    yield put(usersActions.addFriendUserFailed());
  }
}

function* handleUnfriendUserRequest(
  action: PayloadAction<UnfriendUserPayload>
) {
  try {
    yield delay(DELAYS.DEFAULT); // Block spam add friend button

    const response: AxiosResponse<UnfriendUserResponse> = yield call(
      unfriendUser,
      action.payload
    );

    yield put(usersActions.unfriendUserSuccess(response.data));
  } catch (error) {
    notifySagaError(usersActions.unfriendUserFailed, error);
    yield put(usersActions.unfriendUserFailed());
  }
}

function* handleFollowUserRequest(action: PayloadAction<FollowUserPayload>) {
  const userId = action.payload;

  try {
    yield delay(DELAYS.DEFAULT); // Block spam follow button

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

function* handleUnfollowUserRequest(
  action: PayloadAction<UnfollowUserPayload>
) {
  try {
    yield delay(DELAYS.DEFAULT); // Block spam unfollow button

    const response: AxiosResponse<UnfollowUserResponse> = yield call(
      unfollowUser,
      action.payload
    );

    yield put(usersActions.unfollowUserSuccess(response.data));
  } catch (error) {
    notifySagaError(usersActions.unfollowUserFailed, error);
    yield put(usersActions.unfollowUserFailed());
  }
}

function* handleGetFriendsRequest(action: PayloadAction<GetFriendsPayload>) {
  try {
    const response: AxiosResponse<GetUserFriendsResponse> = yield call(
      getFriends,
      action.payload
    );

    yield put(usersActions.getFriendsSuccess(response.data));
  } catch (error) {
    notifySagaError(usersActions.getFriendsFailed, error);
    yield put(usersActions.getFriendsFailed());
  }
}

function* usersSaga() {
  yield takeLatest(
    usersActions.addFriendUserRequest,
    handleAddFriendUserRequest
  );
  yield takeLatest(usersActions.unfriendUserRequest, handleUnfriendUserRequest);
  yield takeLatest(usersActions.followUserRequest, handleFollowUserRequest);
  yield takeLatest(usersActions.unfollowUserRequest, handleUnfollowUserRequest);
  yield takeLatest(usersActions.getFriendsRequest, handleGetFriendsRequest);
}

export default usersSaga;
