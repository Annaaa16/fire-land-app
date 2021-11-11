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
  UnlikePost,
  LikePost,
} from '@/models/posts';
import { PayloadAction } from '@reduxjs/toolkit';
import { CreateCommentResponse, GetCommentsResponse } from '@/models/comments';
import { HydrateResponse } from '@/models/common';

const initialState: PostsInitState = {
  success: false,
  prevPage: null,
  nextPage: null,
  total: 0,
  posts: [],
  updatePost: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addCreatedPost: (state, action: PayloadAction<CreatePostsResponse>) => {
      const { success, post } = action.payload;

      if (success) {
        state.success = success;
        state.posts.unshift(post);
      }
    },

    addFetchedPosts: (state, action: PayloadAction<GetPostsResponse>) => {
      const { success, posts, ...others } = action.payload;

      if (success) {
        return {
          ...state,
          ...others,
          posts: [...state.posts, ...posts],
        };
      }
    },

    clearPosts: (state) => {
      state.posts.length = 0;
    },

    setUpdatePost: (state, action: PayloadAction<string | null>) => {
      const postId = action.payload;

      if (!postId) return { ...state, updatePost: null };

      const updatePost = state.posts.find((post) => post._id === postId)!;

      return { ...state, updatePost };
    },

    setUpdatedPost: (state, action: PayloadAction<UpdatePostResponse>) => {
      const { success, post: updatedPost } = action.payload;

      if (success) {
        const posts = state.posts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        );

        return { ...state, updatePost: null, posts };
      }
    },

    removeDeletedPost: (state, action: PayloadAction<DeletePostResponse>) => {
      const { _id, success } = action.payload;

      if (success) {
        const filteredPosts = state.posts.filter((post) => post._id !== _id);

        return { ...state, posts: filteredPosts };
      }
    },

    setUserLiked: (state, action: PayloadAction<LikePost>) => {
      const { userId, postId } = action.payload;

      state.posts.forEach((post) => {
        if (post._id === postId) {
          post.likes[post.likes.length] = userId;
        }
      });
    },

    clearUserUnliked: (state, action: PayloadAction<UnlikePost>) => {
      const { userId, postId } = action.payload;

      state.posts.forEach(
        (post) =>
          post._id === postId &&
          post.likes.splice(post.likes.indexOf(userId), 1)
      );
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

    updateCommentCount: (
      state,
      action: PayloadAction<CreateCommentResponse>
    ) => {
      const { success, comment } = action.payload;

      if (success) {
        const posts = state.posts.map((post) => {
          return post._id === comment.postId
            ? { ...post, commentCount: post.commentCount + 1 }
            : post;
        });

        return { ...state, posts };
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

export const {
  addCreatedPost,
  addFetchedPosts,
  clearPosts,
  setUpdatePost,
  setUpdatedPost,
  removeDeletedPost,
  setUserLiked,
  clearUserUnliked,
  setPagination,
  updateCommentCount,
} = postsSlice.actions;

export default postsSlice.reducer;
