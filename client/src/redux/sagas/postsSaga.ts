import { call, delay, put, takeLatest } from '@redux-saga/core/effects';

// types
import {
  GetPostsResponse,
  DeletePostResponse,
  UpdatePostResponse,
  LikePostResponse,
} from '@/models/posts';
import { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { GetPosts, UpdatePost } from '@/models/posts';

import {
  createPost as createPostAct,
  getPosts as getPostsAct,
  updatePost as updatePostAct,
  deletePost as deletePostAct,
  likePost as likePostAct,
} from '../actions/posts';
import {
  addCreatedPost,
  addFetchedPostList,
  removeDeletedPost,
  setLikedPost,
  setUpdatedPost,
} from '../slices/postsSlice';
import { postsApiClient } from '@/apis/postsApi';
import { notifySagaError } from '@/helpers/notify';

const { createPost, getPosts, updatePost, deletePost, likePost } =
  postsApiClient();

function* handleCreatePost(action: PayloadAction<FormData>) {
  try {
    yield delay(300); // Block spam upload button

    const response: AxiosResponse<UpdatePostResponse> = yield call(
      createPost,
      action.payload
    );

    yield put(addCreatedPost(response.data));
  } catch (error) {
    console.log('Create post error 👉', error);
  }
}

function* handleGetPosts(action: PayloadAction<GetPosts>) {
  try {
    const params = action.payload;

    const response: AxiosResponse<GetPostsResponse> = yield call(
      getPosts,
      params
    );

    yield put(addFetchedPostList(response.data));
  } catch (error) {
    notifySagaError('Get posts', error);
  }
}

function* handleUpdatePost(action: PayloadAction<UpdatePost>) {
  try {
    yield delay(300); // Block spam update button

    const response: AxiosResponse<UpdatePostResponse> = yield call(
      updatePost,
      action.payload
    );

    yield put(setUpdatedPost(response.data));
  } catch (error) {
    notifySagaError('Update post', error);
  }
}

function* handleDeletePost(action: PayloadAction<string>) {
  try {
    const postId = action.payload;

    yield delay(300); // Block spam delete button

    const response: AxiosResponse<DeletePostResponse> = yield call(
      deletePost,
      postId
    );

    yield put(removeDeletedPost(response.data));
  } catch (error) {
    notifySagaError('Delete post', error);
  }
}

function* handleLikePost(action: PayloadAction<string>) {
  try {
    const postId = action.payload;

    yield delay(300); // Block spam like button

    const response: AxiosResponse<LikePostResponse> = yield call(
      likePost,
      postId
    );

    yield put(setLikedPost(response.data));
  } catch (error) {
    notifySagaError('Like post', error);
  }
}

function* postsSaga() {
  yield takeLatest(createPostAct.request().type, handleCreatePost);
  yield takeLatest(getPostsAct.request().type, handleGetPosts);
  yield takeLatest(updatePostAct.request().type, handleUpdatePost);
  yield takeLatest(deletePostAct.request().type, handleDeletePost);
  yield takeLatest(likePostAct.request().type, handleLikePost);
}

export default postsSaga;
