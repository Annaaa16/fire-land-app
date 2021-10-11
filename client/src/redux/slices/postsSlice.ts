import { createSlice } from '@reduxjs/toolkit';

// next redux wrapper
import { HYDRATE } from 'next-redux-wrapper';

// lodash
import _ from 'lodash';

// types
import { PayloadAction } from '@reduxjs/toolkit';
import {
  UploadPostResponse,
  GetPostsResponse,
  DeletePostResponse,
  PostsInitState,
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
    addCreatedPost: (state, action: PayloadAction<UploadPostResponse>) => {
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

      const updatePost = state.posts.find((post) => post.id == postId) as Post;

      return { ...state, updatePost };
    },

    setUpdatedPost: (state, action: PayloadAction<UploadPostResponse>) => {
      const { success, post: updatedPost } = action.payload;

      if (success) {
        const posts = state.posts.map((post) =>
          post.id === updatedPost.id ? updatedPost : post
        );

        return { ...state, updatePost: null, posts };
      }
    },

    removeDeletedPost: (state, action: PayloadAction<DeletePostResponse>) => {
      const { id, success } = action.payload;

      if (success) {
        const filteredPosts = state.posts.filter((post) => post.id !== id);

        return { ...state, posts: filteredPosts };
      }
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action: PayloadAction<HydrateResponse>) => {
      const payload = { ...action.payload.posts };

      if (payload) {
        // Prevent duplicate from gSSP data
        const filteredPosts = _.uniqBy(payload.posts, 'id');

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
} = postsSlice.actions;

export default postsSlice.reducer;
