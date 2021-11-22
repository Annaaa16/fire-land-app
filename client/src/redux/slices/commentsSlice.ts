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
import { addLoading, removeLoading } from '@/helpers/reduxStateLoadings';

const actions = {
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
      addLoading(state, actions.createComment);
    },
    createCommentSuccess: (
      state,
      action: PayloadAction<CreateCommentResponse>
    ) => {
      const { success, comment } = action.payload;

      if (success) {
        state.comments.unshift(comment);

        removeLoading(state, actions.createComment);
      }
    },
    createCommentFailed: (state) => {
      removeLoading(state, actions.createComment);
    },

    getCommentsRequest: (state, action: PayloadAction<GetCommentsPayload>) => {
      addLoading(state, actions.getComments);
    },
    getCommentsSuccess: (state, action: PayloadAction<GetCommentsResponse>) => {
      const { success, comments } = action.payload;

      if (success) {
        state.comments.push(...comments);

        removeLoading(state, actions.getComments);
      }
    },
    getCommentsFailed: (state) => {
      removeLoading(state, actions.getComments);
    },

    clearComments: (state, action: PayloadAction<string>) => {
      const postId = action.payload;

      _.remove(state.comments, (n) => n.postId === postId);
    },
  },
});

export { actions };

export const commentsActions = comments.actions;

export default comments.reducer;
