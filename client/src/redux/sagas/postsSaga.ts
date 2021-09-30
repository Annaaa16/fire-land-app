import { call, delay, put, takeLatest } from '@redux-saga/core/effects';

// types
import { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  GetPostsResponse,
  DeletePostResponse,
  UploadPostResponse,
} from '@/models/posts';
import { GetPosts, UpdatePost } from '../actions/posts';

import {
  reqCreatePost,
  reqGetPosts,
  reqUpdatePost,
  reqDeletePost,
} from '@/apis/postsApi';
import { createPost, getPosts, updatePost, deletePost } from '../actions/posts';
import {
  addCreatedPost,
  addFetchedPostList,
  removeDeletedPost,
  setUpdatedPost,
} from '../slices/postsSlice';

function* handleReqCreatePost(action: PayloadAction<FormData>) {
  try {
    const uploadData = action.payload;

    yield delay(300); // Block spam upload button

    const response: AxiosResponse<UploadPostResponse> = yield call(
      reqCreatePost,
      uploadData
    );

    yield put(addCreatedPost(response.data));
  } catch (error) {
    console.log('Create post error 👉', error);
  }
}

function* handleReqGetPosts(action: PayloadAction<GetPosts>) {
  try {
    const params = action.payload;

    const response: AxiosResponse<GetPostsResponse> = yield call(
      reqGetPosts,
      params
    );

    yield put(addFetchedPostList(response.data));
  } catch (error) {
    console.log('Get posts error 👉', error);
  }
}

function* handleReqUpdatePost(action: PayloadAction<UpdatePost>) {
  try {
    const updateData = action.payload;

    yield delay(300); // Block spam update button

    const response: AxiosResponse<UploadPostResponse> = yield call(
      reqUpdatePost,
      updateData
    );

    yield put(setUpdatedPost(response.data));
  } catch (error) {
    console.log('Update post error 👉', error);
  }
}

function* handleReqDeletePost(action: PayloadAction<string>) {
  try {
    const id = action.payload;

    yield delay(300); // Block spam update button

    const response: AxiosResponse<DeletePostResponse> = yield call(
      reqDeletePost,
      id
    );

    yield put(removeDeletedPost(response.data));
  } catch (error) {
    console.log('Update post error 👉', error);
  }
}

function* postsSaga() {
  yield takeLatest(createPost.request().type, handleReqCreatePost);
  yield takeLatest(getPosts.request().type, handleReqGetPosts);
  yield takeLatest(updatePost.request().type, handleReqUpdatePost);
  yield takeLatest(deletePost.request().type, handleReqDeletePost);
}

export default postsSaga;
