import { createSlice } from '@reduxjs/toolkit';

// lodash
import _ from 'lodash';

// types
import { PayloadAction } from '@reduxjs/toolkit';
import {
  CommentsInitState,
  CreateCommentPayload,
  CreateCommentResponse,
  GetCommentsPayload,
  GetCommentsResponse,
} from '@/models/comments';
import { addLoading, removeLoading } from '@/helpers/loadings';

const loadings = {
  createComment: 'createComment',
  getComments: 'getComments',
};

const initialState: CommentsInitState = {
  comments: [],
  loadings: [],
};

const comments = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    createCommentRequest: (
      state,
      action: PayloadAction<CreateCommentPayload>
    ) => {
      addLoading(state, loadings.createComment);
    },
    createCommentSuccess: (
      state,
      action: PayloadAction<CreateCommentResponse>
    ) => {
      const { success, comment } = action.payload;

      if (success) {
        state.comments.unshift(comment);

        removeLoading(state, loadings.createComment);
      }
    },
    createCommentFailed: (state) => {
      removeLoading(state, loadings.createComment);
    },

    getCommentsRequest: (state, action: PayloadAction<GetCommentsPayload>) => {
      addLoading(state, loadings.getComments);
    },
    getCommentsSuccess: (state, action: PayloadAction<GetCommentsResponse>) => {
      const { success, comments } = action.payload;

      if (success) {
        state.comments.push(...comments);

        removeLoading(state, loadings.getComments);
      }
    },
    getCommentsFailed: (state) => {
      removeLoading(state, loadings.getComments);
    },

    clearComments: (state, action: PayloadAction<string>) => {
      const postId = action.payload;

      _.remove(state.comments, (n) => n.postId === postId);
    },
  },
});

export { loadings };

export const commentsActions = comments.actions;

export default comments.reducer;
