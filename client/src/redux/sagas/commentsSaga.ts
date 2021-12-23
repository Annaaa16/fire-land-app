import { call, delay, put, takeLatest } from '@redux-saga/core/effects';

// types
import { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  CreateCommentPayload,
  CreateCommentResponse,
  GetCommentsPayload,
  GetCommentsResponse,
} from '@/models/comments';

import { DELAYS } from '@/constants';
import { commentActions } from '../slices/commentsSlice';
import { commentsApiClient } from '@/apis/commentsApi';
import { postActions } from '../slices/postsSlice';
import { notifySagaError } from '@/helpers/notifyError';

const { createComment, getComments } = commentsApiClient();

function* handleCreateCommentRequest(
  action: PayloadAction<CreateCommentPayload>
) {
  try {
    yield delay(DELAYS.DEFAULT); // Block spam comment

    const response: AxiosResponse<CreateCommentResponse> = yield call(
      createComment,
      action.payload
    );

    yield put(commentActions.createCommentSuccess(response.data));
    yield put(postActions.increaseCommentCount(response.data));
  } catch (error) {
    notifySagaError(commentActions.createCommentFailed, error);
    yield put(commentActions.createCommentFailed());
  }
}

function* handleGetCommentsRequest(action: PayloadAction<GetCommentsPayload>) {
  try {
    yield delay(DELAYS.DEFAULT); // Block spam get comments

    const response: AxiosResponse<GetCommentsResponse> = yield call(
      getComments,
      action.payload
    );

    yield put(commentActions.getCommentsSuccess(response.data));
    yield put(postActions.setPagination(response.data));
  } catch (error) {
    notifySagaError(commentActions.getCommentsFailed, error);
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
