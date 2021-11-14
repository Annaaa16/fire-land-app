import { createSlice } from '@reduxjs/toolkit';

// next redux wrapper
import { HYDRATE } from 'next-redux-wrapper';

// lodash
import _ from 'lodash';

// types
import {
  CreatePostsResponse,
  GetPostsResponse,
  DeletePostResponse,
  PostsInitState,
  UpdatePostResponse,
  UnlikePostPayload,
  LikePostPayload,
  GetPostsPayload,
  UpdatePostPayload,
} from '@/models/posts';
import { PayloadAction } from '@reduxjs/toolkit';
import { CreateCommentResponse, GetCommentsResponse } from '@/models/comments';
import { HydrateResponse } from '@/models/common';

import { addLoading, removeLoading } from '@/helpers/loadings';

const loadings = {
  createPost: 'createPost',
  getPosts: 'getPosts',
  updatePost: 'updatePost',
  deletePost: 'deletePost',
  likePost: 'likePost',
  unlikePost: 'unlikePost',
};

const initialState: PostsInitState = {
  prevPage: null,
  nextPage: null,
  total: 0,
  posts: [],
  updatePost: null,
  loadings: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    createPostRequest: (state, action: PayloadAction<FormData>) => {
      addLoading(state, loadings.createPost);
    },
    createPostSuccess: (state, action: PayloadAction<CreatePostsResponse>) => {
      const { success, post } = action.payload;

      if (success) {
        state.posts.unshift(post);

        removeLoading(state, loadings.createPost);
      }
    },
    createPostFailed: (state) => {
      removeLoading(state, loadings.createPost);
    },

    getPostsRequest: (state, action: PayloadAction<GetPostsPayload>) => {
      addLoading(state, loadings.getPosts);
    },
    getPostsSuccess: (state, action: PayloadAction<GetPostsResponse>) => {
      const { success, posts, prevPage, nextPage, total } = action.payload;

      if (success) {
        state.posts = [...state.posts, ...posts];
        state.prevPage = prevPage!;
        state.nextPage = nextPage!;
        state.total = total!;

        removeLoading(state, loadings.getPosts);
      }
    },
    getPostsFailed: (state) => {
      removeLoading(state, loadings.getPosts);
    },

    updatePostRequest: (state, action: PayloadAction<UpdatePostPayload>) => {
      addLoading(state, loadings.updatePost);
    },
    updatePostSuccess: (state, action: PayloadAction<UpdatePostResponse>) => {
      const { success, post: updatedPost } = action.payload;

      if (success) {
        state.updatePost = null;
        state.posts = state.posts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        );

        removeLoading(state, loadings.updatePost);
      }
    },
    updatePostFailed: (state) => {
      removeLoading(state, loadings.updatePost);
    },

    deletePostRequest: (state, action: PayloadAction<string>) => {
      addLoading(state, loadings.deletePost);
    },
    deletePostSuccess: (state, action: PayloadAction<DeletePostResponse>) => {
      const { postId, success } = action.payload;

      if (success) {
        state.posts = state.posts.filter((post) => post._id !== postId);

        removeLoading(state, loadings.deletePost);
      }
    },
    deletePostFailed: (state) => {
      removeLoading(state, loadings.deletePost);
    },

    likePostRequest: (state, action: PayloadAction<LikePostPayload>) => {
      addLoading(state, loadings.likePost);
    },
    likePostSuccess: (state, action: PayloadAction<LikePostPayload>) => {
      const { userId, postId } = action.payload;

      state.posts.forEach((post) => {
        if (post._id === postId) {
          post.likes[post.likes.length] = userId;
        }
      });

      removeLoading(state, loadings.likePost);
    },
    likePostFailure: (state) => {
      removeLoading(state, loadings.likePost);
    },

    unlikePostRequest: (state, action: PayloadAction<UnlikePostPayload>) => {
      addLoading(state, loadings.unlikePost);
    },
    unlikePostSuccess: (state, action: PayloadAction<UnlikePostPayload>) => {
      const { userId, postId } = action.payload;

      state.posts.forEach(
        (post) =>
          post._id === postId &&
          post.likes.splice(post.likes.indexOf(userId), 1)
      );

      removeLoading(state, loadings.unlikePost);
    },
    unlikePostFailure: (state) => {
      removeLoading(state, loadings.unlikePost);
    },

    setUpdatePost: (state, action: PayloadAction<string | null>) => {
      const postId = action.payload;

      if (!postId) return { ...state, updatePost: null };

      const updatePost = state.posts.find((post) => post._id === postId)!;

      return { ...state, updatePost };
    },

    clearPosts: (state) => {
      state.posts.length = 0;
    },

    setPagination: (state, action: PayloadAction<GetCommentsResponse>) => {
      const { success, comments, nextPage, prevPage, total } = action.payload;

      if (success && comments.length > 0) {
        const commentedPost = state.posts.find(
          (post) => post._id === comments[0].postId
        );

        commentedPost!.nextPage = nextPage;
        commentedPost!.prevPage = prevPage;
        commentedPost!.total = total;
      }
    },

    increaseCommentCount: (
      state,
      action: PayloadAction<CreateCommentResponse>
    ) => {
      const { success, comment } = action.payload;

      if (success) {
        state.posts.forEach((post) => {
          if (post._id === comment.postId) {
            post.commentCount = post.commentCount + 1;
          }
        });
      }
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action: PayloadAction<HydrateResponse>) => {
      const payload = { ...action.payload.posts };

      if (payload) {
        // Prevent duplicate from gSSP data
        const filteredPosts = _.uniqBy(payload.posts, '_id');

        payload.posts = filteredPosts;

        return { ...state, ...payload };
      }
    },
  },
});

export { loadings };

export const postsActions = postsSlice.actions;

export default postsSlice.reducer;
