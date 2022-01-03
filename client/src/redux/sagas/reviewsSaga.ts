// types
import { PayloadAction } from '@reduxjs/toolkit';
import {
  CreateReviewPayload,
  CreateReviewResponse,
  GetReviewsPayload,
  GetReviewsResponse,
} from '@/models/reviews';

import { reviewActions } from '../slices/reviewsSlice';
import { call, put, takeLatest } from '@redux-saga/core/effects';
import { reviewsApiClient } from '@/apis/reviewsApi';

const { createReview, getReviews } = reviewsApiClient();

function* handleCreateReviewRequest(
  action: PayloadAction<CreateReviewPayload>
) {
  try {
    const response: CreateReviewResponse = yield call(
      createReview,
      action.payload
    );

    yield put(reviewActions.createReviewSuccess(response));
  } catch (error) {
    yield put(reviewActions.createReviewFailed());
  }
}

function* handleGetReviewsRequest(action: PayloadAction<GetReviewsPayload>) {
  try {
    const response: GetReviewsResponse = yield call(getReviews, action.payload);

    yield put(reviewActions.getReviewsSuccess(response));
  } catch (error) {
    yield put(reviewActions.getReviewsFailed());
  }
}

function* reviewsSaga() {
  yield takeLatest(
    reviewActions.createReviewRequest,
    handleCreateReviewRequest
  );
  yield takeLatest(reviewActions.getReviewsRequest, handleGetReviewsRequest);
}

export default reviewsSaga;
