import { createSlice } from '@reduxjs/toolkit';

// lodash
import _ from 'lodash';

// types
import { PayloadAction } from '@reduxjs/toolkit';
import {
  CommentsInitState,
  CreateCommentResponse,
  GetCommentsResponse,
} from '@/models/comments';

const initialState: CommentsInitState = {
  comments: [],
};

const comments = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addCreatedComment: (
      state,
      action: PayloadAction<CreateCommentResponse>
    ) => {
      const { success, comment } = action.payload;

      if (success) {
        state.comments.unshift(comment);
      }
    },

    addFetchedCommentList: (
      state,
      action: PayloadAction<GetCommentsResponse>
    ) => {
      const { success, comments } = action.payload;

      if (success) {
        state.comments.push(...comments);
      }
    },

    clearComments: (state, action: PayloadAction<string>) => {
      const postId = action.payload;

      _.remove(state.comments, (n) => n.postId === postId);
    },
  },
});

export const { addCreatedComment, addFetchedCommentList, clearComments } =
  comments.actions;

export default comments.reducer;
