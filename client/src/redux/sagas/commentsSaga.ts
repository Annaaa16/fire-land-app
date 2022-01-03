import { call, delay, put, takeLatest } from '@redux-saga/core/effects';

// types
import {
  CreateCommentPayload,
  CreateCommentResponse,
  GetCommentsPayload,
  GetCommentsResponse,
} from '@/models/comments';
import { PayloadAction } from '@reduxjs/toolkit';

import { DELAYS } from '@/constants';
import { commentActions } from '../slices/commentsSlice';
import { commentsApiClient } from '@/apis/commentsApi';
import { postActions } from '../slices/postsSlice';

const { createComment, getComments } = commentsApiClient();

function* handleCreateCommentRequest(
  action: PayloadAction<CreateCommentPayload>
) {
  try {
    yield delay(DELAYS.DEFAULT); // Block spam comment

    const response: CreateCommentResponse = yield call(
      createComment,
      action.payload
    );

    yield put(commentActions.createCommentSuccess(response));
    yield put(postActions.increaseCommentCount(response));
  } catch (error) {
    yield put(commentActions.createCommentFailed());
  }
}

function* handleGetCommentsRequest(action: PayloadAction<GetCommentsPayload>) {
  try {
    yield delay(DELAYS.DEFAULT); // Block spam get comments

    const response: GetCommentsResponse = yield call(
      getComments,
      action.payload
    );

    yield put(commentActions.getCommentsSuccess(response));
    yield put(postActions.setPagination(response));
  } catch (error) {
    yield put(commentActions.getCommentsFailed());
  }
}

function* commentsSaga() {
  yield takeLatest(
    commentActions.createCommentRequest,
    handleCreateCommentRequest
  );
  yield takeLatest(commentActions.getCommentsRequest, handleGetCommentsRequest);
}

export default commentsSaga;
