import { call, delay, put, takeLatest } from '@redux-saga/core/effects';

// types
import {
  GetPostsResponse,
  DeletePostResponse,
  UpdatePostResponse,
  GetPosts,
  UnlikePost,
  LikePost,
} from '@/models/posts';
import { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { UpdatePost } from '@/models/posts';

import {
  createPost as createPostAct,
  getPosts as getPostsAct,
  updatePost as updatePostAct,
  deletePost as deletePostAct,
  likePost as likePostAct,
  unlikePost as unlikePostAct,
} from '../actions/posts';
import {
  addCreatedPost,
  addFetchedPosts,
  removeDeletedPost,
  setUserLiked,
  clearUserUnliked,
  setUpdatedPost,
} from '../slices/postsSlice';
import { DELAYS } from '@/constants';
import { postsApiClient } from '@/apis/postsApi';
import { notifySagaError } from '@/helpers/notify';

const { createPost, getPosts, updatePost, deletePost, likePost, unlikePost } =
  postsApiClient();

function* handleCreatePost(action: PayloadAction<FormData>) {
  try {
    yield delay(DELAYS.DEFAULT); // Block spam upload button

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
    const response: AxiosResponse<GetPostsResponse> = yield call(
      getPosts,
      action.payload
    );

    yield put(addFetchedPosts(response.data));
  } catch (error) {
    notifySagaError('Get posts', error);
  }
}

function* handleUpdatePost(action: PayloadAction<UpdatePost>) {
  try {
    yield delay(DELAYS.DEFAULT); // Block spam update button

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

    yield delay(DELAYS.DEFAULT); // Block spam delete button

    const response: AxiosResponse<DeletePostResponse> = yield call(
      deletePost,
      postId
    );

    yield put(removeDeletedPost(response.data));
  } catch (error) {
    notifySagaError('Delete post', error);
  }
}

function* handleLikePost(action: PayloadAction<LikePost>) {
  try {
    const { postId } = action.payload;

    yield put(setUserLiked(action.payload));

    yield delay(DELAYS.DOUBLE); // Block spam like button

    yield call(likePost, postId);
  } catch (error) {
    notifySagaError('Like post', error);
  }
}

function* handleUnlikePost(action: PayloadAction<UnlikePost>) {
  try {
    const { postId } = action.payload;

    yield put(clearUserUnliked(action.payload));

    yield delay(DELAYS.DOUBLE); // Block spam like button

    yield call(unlikePost, postId);
  } catch (error) {
    notifySagaError('Unlike post', error);
  }
}

function* postsSaga() {
  yield takeLatest(createPostAct.request().type, handleCreatePost);
  yield takeLatest(getPostsAct.request().type, handleGetPosts);
  yield takeLatest(updatePostAct.request().type, handleUpdatePost);
  yield takeLatest(deletePostAct.request().type, handleDeletePost);
  yield takeLatest(likePostAct.request().type, handleLikePost);
  yield takeLatest(unlikePostAct.request().type, handleUnlikePost);
}

export default postsSaga;
