import { call, delay, put, takeLatest } from '@redux-saga/core/effects';

// types
import { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  CreateComment,
  CreateCommentResponse,
  GetComments,
  GetCommentsResponse,
} from '@/models/comments';

import { commentsApiClient } from '@/apis/commentsApi';
import {
  addCreatedComment,
  addFetchedCommentList,
} from '../slices/commentsSlice';
import { DELAYS } from '@/constants';
import { setPagination, updateCommentCount } from '../slices/postsSlice';
import { createComment as createCommentAct } from '../actions/comments';
import { getComments as getCommentsAct } from '../actions/comments';
import { notifySagaError } from '@/helpers/notify';

const { createComment, getComments } = commentsApiClient();

function* handleCreateComment(action: PayloadAction<CreateComment>) {
  try {
    yield delay(DELAYS.DEFAULT); // Block spam comment

    const response: AxiosResponse<CreateCommentResponse> = yield call(
      createComment,
      action.payload
    );

    yield put(addCreatedComment(response.data));
    yield put(updateCommentCount(response.data));
  } catch (error) {
    notifySagaError('Create comment', error);
  }
}

function* handleGetComments(action: PayloadAction<GetComments>) {
  try {
    yield delay(DELAYS.DEFAULT); // Block spam get comments

    const response: AxiosResponse<GetCommentsResponse> = yield call(
      getComments,
      action.payload
    );

    yield put(addFetchedCommentList(response.data));
    yield put(setPagination(response.data));
  } catch (error) {
    notifySagaError('Get comments', error);
  }
}

function* commentsSaga() {
  yield takeLatest(createCommentAct.request().type, handleCreateComment);
  yield takeLatest(getCommentsAct.request().type, handleGetComments);
}

export default commentsSaga;
