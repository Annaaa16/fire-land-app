import { call, delay, put, takeLatest } from '@redux-saga/core/effects';

// types
import {
  GetPostsResponse,
  DeletePostResponse,
  UpdatePostResponse,
  GetPostsPayload,
  ReactPostPayload,
  DeletePostPayload,
} from '@/models/posts';
import { PayloadAction } from '@reduxjs/toolkit';
import { UpdatePostPayload } from '@/models/posts';

import { DELAYS } from '@/constants';
import { postActions } from '../slices/postsSlice';
import { postsApiClient } from '@/apis/postsApi';

const { createPost, getPosts, updatePost, deletePost, reactPost } =
  postsApiClient();

function* handleCreatePostRequest(action: PayloadAction<FormData>) {
  try {
    yield delay(DELAYS.DEFAULT); // Block spam upload button

    const response: UpdatePostResponse = yield call(createPost, action.payload);

    yield put(postActions.createPostSuccess(response));
  } catch (error) {
    yield put(postActions.createPostFailed());
  }
}

function* handleGetPostsRequest(action: PayloadAction<GetPostsPayload>) {
  try {
    const response: GetPostsResponse = yield call(getPosts, action.payload);

    yield put(postActions.getPostsSuccess(response));
  } catch (error) {
    yield put(postActions.getPostsFailed());
  }
}

function* handleUpdatePostRequest(action: PayloadAction<UpdatePostPayload>) {
  try {
    yield delay(DELAYS.DEFAULT); // Block spam update button

    const response: UpdatePostResponse = yield call(updatePost, action.payload);

    yield put(postActions.updatePostSuccess(response));
  } catch (error) {
    yield put(postActions.updatePostFailed());
  }
}

function* handleDeletePostRequest(action: PayloadAction<DeletePostPayload>) {
  try {
    yield delay(DELAYS.DEFAULT); // Block spam delete button

    const response: DeletePostResponse = yield call(deletePost, action.payload);

    yield put(postActions.deletePostSuccess(response));
  } catch (error) {
    yield put(postActions.deletePostFailed());
  }
}

function* handleReactPostRequest(action: PayloadAction<ReactPostPayload>) {
  try {
    yield put(postActions.reactPostSuccess(action.payload));

    yield call(reactPost, action.payload);
  } catch (error) {
    yield put(postActions.reactPostFailure());
  }
}

function* postsSaga() {
  yield takeLatest(postActions.createPostRequest, handleCreatePostRequest);
  yield takeLatest(postActions.getPostsRequest, handleGetPostsRequest);
  yield takeLatest(postActions.updatePostRequest, handleUpdatePostRequest);
  yield takeLatest(postActions.deletePostRequest, handleDeletePostRequest);
  yield takeLatest(postActions.reactPostRequest, handleReactPostRequest);
}

export default postsSaga;
