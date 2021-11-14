import { call, delay, put, takeLatest } from '@redux-saga/core/effects';

// types
import {
  GetPostsResponse,
  DeletePostResponse,
  UpdatePostResponse,
  GetPostsPayload,
  UnlikePostPayload,
  LikePostPayload,
} from '@/models/posts';
import { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { UpdatePostPayload } from '@/models/posts';

import { postsActions } from '../slices/postsSlice';
import { DELAYS } from '@/constants';
import { postsApiClient } from '@/apis/postsApi';
import { notifySagaError } from '@/helpers/notifyError';

const { createPost, getPosts, updatePost, deletePost, likePost, unlikePost } =
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

function* handleLikePostRequest(action: PayloadAction<LikePostPayload>) {
  try {
    const { postId } = action.payload;

    yield put(postsActions.likePostSuccess(action.payload));

    yield delay(DELAYS.DOUBLE); // Block spam like button

    yield call(likePost, postId);
  } catch (error) {
    notifySagaError(postsActions.likePostFailure, error);
    yield put(postsActions.likePostFailure());
  }
}

function* handleUnlikePostRequest(action: PayloadAction<UnlikePostPayload>) {
  try {
    const { postId } = action.payload;

    yield put(postsActions.unlikePostSuccess(action.payload));

    yield delay(DELAYS.DOUBLE); // Block spam like button

    yield call(unlikePost, postId);
  } catch (error) {
    notifySagaError(postsActions.unlikePostFailure, error);
    yield put(postsActions.unlikePostFailure());
  }
}

function* postsSaga() {
  yield takeLatest(postsActions.createPostRequest, handleCreatePostRequest);
  yield takeLatest(postsActions.getPostsRequest, handleGetPostsRequest);
  yield takeLatest(postsActions.updatePostRequest, handleUpdatePostRequest);
  yield takeLatest(postsActions.deletePostRequest, handleDeletePostRequest);
  yield takeLatest(postsActions.likePostRequest, handleLikePostRequest);
  yield takeLatest(postsActions.unlikePostRequest, handleUnlikePostRequest);
}

export default postsSaga;
