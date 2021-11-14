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
import { commentsActions } from '../slices/commentsSlice';
import { commentsApiClient } from '@/apis/commentsApi';
import { postsActions } from '../slices/postsSlice';
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

    yield put(commentsActions.createCommentSuccess(response.data));
    yield put(postsActions.increaseCommentCount(response.data));
  } catch (error) {
    notifySagaError(commentsActions.createCommentFailed, error);
    yield put(commentsActions.createCommentFailed());
  }
}

function* handleGetCommentsRequest(action: PayloadAction<GetCommentsPayload>) {
  try {
    yield delay(DELAYS.DEFAULT); // Block spam get comments

    const response: AxiosResponse<GetCommentsResponse> = yield call(
      getComments,
      action.payload
    );

    yield put(commentsActions.getCommentsSuccess(response.data));
    yield put(postsActions.setPagination(response.data));
  } catch (error) {
    notifySagaError(commentsActions.getCommentsFailed, error);
    yield put(commentsActions.getCommentsFailed());
  }
}

function* commentsSaga() {
  yield takeLatest(
    commentsActions.createCommentRequest,
    handleCreateCommentRequest
  );
  yield takeLatest(
    commentsActions.getCommentsRequest,
    handleGetCommentsRequest
  );
}

export default commentsSaga;
