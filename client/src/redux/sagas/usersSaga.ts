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

import { DELAYS } from '@/constants';
import { userActions } from '../slices/usersSlice';
import { usersApiClient } from '@/apis/usersApi';

const { addFriendUser, unfriendUser, followUser, unfollowUser, getFriends } =
  usersApiClient();

function* handleAddFriendUserRequest(
  action: PayloadAction<AddFriendUserPayload>
) {
  try {
    yield delay(DELAYS.DEFAULT); // Block spam add friend button

    const response: AddFriendUserResponse = yield call(
      addFriendUser,
      action.payload
    );

    yield put(userActions.addFriendUserSuccess(response));
  } catch (error) {
    yield put(userActions.addFriendUserFailed());
  }
}

function* handleUnfriendUserRequest(
  action: PayloadAction<UnfriendUserPayload>
) {
  try {
    yield delay(DELAYS.DEFAULT); // Block spam add friend button

    const response: UnfriendUserResponse = yield call(
      unfriendUser,
      action.payload
    );

    yield put(userActions.unfriendUserSuccess(response));
  } catch (error) {
    yield put(userActions.unfriendUserFailed());
  }
}

function* handleFollowUserRequest(action: PayloadAction<FollowUserPayload>) {
  const userId = action.payload;

  try {
    yield delay(DELAYS.DEFAULT); // Block spam follow button

    const response: FollowUserResponse = yield call(followUser, userId);

    yield put(userActions.followUserSuccess(response));
  } catch (error) {
    yield put(userActions.followUserFailed());
  }
}

function* handleUnfollowUserRequest(
  action: PayloadAction<UnfollowUserPayload>
) {
  try {
    yield delay(DELAYS.DEFAULT); // Block spam unfollow button

    const response: UnfollowUserResponse = yield call(
      unfollowUser,
      action.payload
    );

    yield put(userActions.unfollowUserSuccess(response));
  } catch (error) {
    yield put(userActions.unfollowUserFailed());
  }
}

function* handleGetFriendsRequest(action: PayloadAction<GetFriendsPayload>) {
  try {
    const response: GetUserFriendsResponse = yield call(
      getFriends,
      action.payload
    );

    yield put(userActions.getFriendsSuccess(response));
  } catch (error) {
    yield put(userActions.getFriendsFailed());
  }
}

function* usersSaga() {
  yield takeLatest(
    userActions.addFriendUserRequest,
    handleAddFriendUserRequest
  );
  yield takeLatest(userActions.unfriendUserRequest, handleUnfriendUserRequest);
  yield takeLatest(userActions.followUserRequest, handleFollowUserRequest);
  yield takeLatest(userActions.unfollowUserRequest, handleUnfollowUserRequest);
  yield takeLatest(userActions.getFriendsRequest, handleGetFriendsRequest);
}

export default usersSaga;
