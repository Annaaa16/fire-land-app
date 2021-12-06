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
  ReactPostPayload,
  GetPostsPayload,
  UpdatePostPayload,
  DeletePostPayload,
} from '@/models/posts';
import { PayloadAction } from '@reduxjs/toolkit';
import { CreateCommentResponse, GetCommentsResponse } from '@/models/comments';
import { HydrateResponse } from '@/models/common';

import { addLoading, removeLoading } from '@/helpers/reduxStateLoadings';

export const actions = {
  createPost: 'createPost',
  getPosts: 'getPosts',
  updatePost: 'updatePost',
  deletePost: 'deletePost',
  reactPost: 'reactPost',
};

const initialState: PostsInitState = {
  prevPage: null,
  nextPage: null,
  total: 0,
  posts: [],
  updatePost: null,
  loadings: [],
  isOpenFormSender: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    createPostRequest: (state, action: PayloadAction<FormData>) => {
      addLoading(state, actions.createPost);
    },
    createPostSuccess: (state, action: PayloadAction<CreatePostsResponse>) => {
      const { success, post } = action.payload;

      if (success) {
        state.posts.unshift(post);

        removeLoading(state, actions.createPost);
      }
    },
    createPostFailed: (state) => {
      removeLoading(state, actions.createPost);
    },

    getPostsRequest: (state, action: PayloadAction<GetPostsPayload>) => {
      addLoading(state, actions.getPosts);
    },
    getPostsSuccess: (state, action: PayloadAction<GetPostsResponse>) => {
      const { success, posts, prevPage, nextPage, total } = action.payload;

      if (success) {
        state.posts = [...state.posts, ...posts];
        state.prevPage = prevPage!;
        state.nextPage = nextPage!;
        state.total = total!;

        removeLoading(state, actions.getPosts);
      }
    },
    getPostsFailed: (state) => {
      removeLoading(state, actions.getPosts);
    },

    updatePostRequest: (state, action: PayloadAction<UpdatePostPayload>) => {
      addLoading(state, actions.updatePost);
    },
    updatePostSuccess: (state, action: PayloadAction<UpdatePostResponse>) => {
      const { success, post: updatedPost } = action.payload;

      if (success) {
        state.updatePost = null;
        state.posts = state.posts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        );

        removeLoading(state, actions.updatePost);
      }
    },
    updatePostFailed: (state) => {
      removeLoading(state, actions.updatePost);
    },

    deletePostRequest: (state, action: PayloadAction<DeletePostPayload>) => {
      addLoading(state, actions.deletePost);
    },
    deletePostSuccess: (state, action: PayloadAction<DeletePostResponse>) => {
      const { postId, success } = action.payload;

      if (success) {
        state.posts = state.posts.filter((post) => post._id !== postId);

        removeLoading(state, actions.deletePost);
      }
    },
    deletePostFailed: (state) => {
      removeLoading(state, actions.deletePost);
    },

    reactPostRequest: (state, action: PayloadAction<ReactPostPayload>) => {
      addLoading(state, actions.reactPost);
    },
    reactPostSuccess: (state, action: PayloadAction<ReactPostPayload>) => {
      const { userId, isReact, isUpdate, postId, emotion } = action.payload;

      state.posts.forEach((post) => {
        if (post._id === postId) {
          if (isReact) {
            if (isUpdate) {
              post.reactions = post.reactions.map((reaction) =>
                reaction.userId === userId ? { userId, emotion } : reaction
              );
            } else {
              post.reactions[post.reactions.length] = { userId, emotion };
            }
          } else {
            post.reactions = post.reactions.filter(
              (reaction) => reaction.userId !== userId
            );
          }
        }
      });

      removeLoading(state, actions.reactPost);
    },
    reactPostFailure: (state) => {
      removeLoading(state, actions.reactPost);
    },

    setIsOpenFormSender: (state, action: PayloadAction<boolean>) => {
      state.isOpenFormSender = action.payload;
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

export const postsActions = postsSlice.actions;

export default postsSlice.reducer;
