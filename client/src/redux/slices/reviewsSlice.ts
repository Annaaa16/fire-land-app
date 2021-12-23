import { createSlice } from '@reduxjs/toolkit';

// lodash
import _ from 'lodash';

// types
import { PayloadAction } from '@reduxjs/toolkit';
import {
  CreateReviewPayload,
  CreateReviewResponse,
  GetReviewsPayload,
  GetReviewsResponse,
  ReviewsInitState,
} from '@/models/reviews';

import { addLoading, removeLoading } from '@/helpers/reduxStateLoadings';

export const actions = {
  createReview: 'createReview',
  getReviews: 'getReviews',
};

const initialState: ReviewsInitState = {
  prevPage: null,
  nextPage: null,
  total: 0,
  reviews: [],
  loadings: [],
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    createReviewRequest: (
      state,
      action: PayloadAction<CreateReviewPayload>
    ) => {
      addLoading(state, actions.createReview);
    },
    createReviewSuccess: (
      state,
      action: PayloadAction<CreateReviewResponse>
    ) => {
      const { success, review } = action.payload;

      if (success) {
        state.reviews.unshift(review);

        removeLoading(state, actions.createReview);
      }
    },
    createReviewFailed: (state) => {
      removeLoading(state, actions.createReview);
    },

    getReviewsRequest: (state, action: PayloadAction<GetReviewsPayload>) => {
      addLoading(state, actions.getReviews);
    },
    getReviewsSuccess: (state, action: PayloadAction<GetReviewsResponse>) => {
      const { success, reviews, prevPage, nextPage, total } = action.payload;

      if (success) {
        state.prevPage = prevPage;
        state.nextPage = nextPage;
        state.total = total;
        state.reviews.push(...reviews);

        removeLoading(state, actions.getReviews);
      }
    },
    getReviewsFailed: (state) => {
      removeLoading(state, actions.getReviews);
    },

    clearReviews: (state) => {
      state.reviews.length = 0;
      state.prevPage = null;
      state.nextPage = null;
      state.total = 0;
    },
  },
});

export const reviewActions = reviewsSlice.actions;

export default reviewsSlice.reducer;
