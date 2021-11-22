import { call, delay, put, takeLatest } from '@redux-saga/core/effects';

// types
import {
  GetPostsResponse,
  DeletePostResponse,
  UpdatePostResponse,
  GetPostsPayload,
  ReactPostPayload,
} from '@/models/posts';
import { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { UpdatePostPayload } from '@/models/posts';

import { DELAYS } from '@/constants';
import { postsActions } from '../slices/postsSlice';
import { postsApiClient } from '@/apis/postsApi';
import { notifySagaError } from '@/helpers/notifyError';

const { createPost, getPosts, updatePost, deletePost, reactPost } =
  postsApiClient();

function* handleCreatePostRequest(action: PayloadAction<FormData>) {
  try {
    yield delay(DELAYS.DEFAULT); // Block spam upload button

    const response: AxiosResponse<UpdatePostResponse> = yield call(
      createPost,
      action.payload
    );

    yield put(postsActions.createPostSuccess(response.data));
  } catch (error) {
    notifySagaError(postsActions.createPostFailed, error);
    yield put(postsActions.createPostFailed());
  }
}

function* handleGetPostsRequest(action: PayloadAction<GetPostsPayload>) {
  try {
    const response: AxiosResponse<GetPostsResponse> = yield call(
      getPosts,
      action.payload
    );

    yield put(postsActions.getPostsSuccess(response.data));
  } catch (error) {
    notifySagaError(postsActions.getPostsFailed, error);
    yield put(postsActions.getPostsFailed());
  }
}

function* handleUpdatePostRequest(action: PayloadAction<UpdatePostPayload>) {
  try {
    yield delay(DELAYS.DEFAULT); // Block spam update button

    const response: AxiosResponse<UpdatePostResponse> = yield call(
      updatePost,
      action.payload
    );

    yield put(postsActions.updatePostSuccess(response.data));
  } catch (error) {
    notifySagaError(postsActions.updatePostFailed, error);
    yield put(postsActions.updatePostFailed());
  }
}

function* handleDeletePostRequest(action: PayloadAction<string>) {
  try {
    const postId = action.payload;

    yield delay(DELAYS.DEFAULT); // Block spam delete button

    const response: AxiosResponse<DeletePostResponse> = yield call(
      deletePost,
      postId
    );

    yield put(postsActions.deletePostSuccess(response.data));
  } catch (error) {
    notifySagaError(postsActions.deletePostFailed, error);
    yield put(postsActions.deletePostFailed());
  }
}

function* handleReactPostRequest(action: PayloadAction<ReactPostPayload>) {
  try {
    yield put(postsActions.reactPostSuccess(action.payload));

    yield call(reactPost, action.payload);
  } catch (error) {
    notifySagaError(postsActions.reactPostFailure, error);
    yield put(postsActions.reactPostFailure());
  }
}

function* postsSaga() {
  yield takeLatest(postsActions.createPostRequest, handleCreatePostRequest);
  yield takeLatest(postsActions.getPostsRequest, handleGetPostsRequest);
  yield takeLatest(postsActions.updatePostRequest, handleUpdatePostRequest);
  yield takeLatest(postsActions.deletePostRequest, handleDeletePostRequest);
  yield takeLatest(postsActions.reactPostRequest, handleReactPostRequest);
}

export default postsSaga;
