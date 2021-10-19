import { createSlice } from '@reduxjs/toolkit';

// next redux wrapper
import { HYDRATE } from 'next-redux-wrapper';

// lodash
import _ from 'lodash';

// types
import { PayloadAction } from '@reduxjs/toolkit';
import {
  CreatePostsResponse,
  GetPostsResponse,
  DeletePostResponse,
  PostsInitState,
  LikePostResponse,
  UpdatePostResponse,
} from '@/models/posts';
import { HydrateResponse, Post } from '@/models/common';

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

    addFetchedPostList: (state, action: PayloadAction<GetPostsResponse>) => {
      const { success, posts, ...others } = action.payload;

      if (success) {
        return {
          ...state,
          ...others,
          posts: [...state.posts, ...posts],
        };
      }
    },

    setUpdatePost: (state, action: PayloadAction<string | null>) => {
      const postId = action.payload;

      if (!postId) return { ...state, updatePost: null };

      const updatePost = state.posts.find(
        (post) => post._id === postId
      ) as Post;

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

    setLikedPost: (state, action: PayloadAction<LikePostResponse>) => {
      const { success, post } = action.payload;

      if (success) {
        const { _id, likes } = post;

        state.posts.forEach((post) => {
          if (post._id === _id) post.likes = likes;
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

export const {
  addCreatedPost,
  addFetchedPostList,
  setUpdatePost,
  setUpdatedPost,
  removeDeletedPost,
  setLikedPost,
} = postsSlice.actions;

export default postsSlice.reducer;
