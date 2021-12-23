// types
import { PayloadAction } from '@reduxjs/toolkit';
import {
  CreateReviewPayload,
  CreateReviewResponse,
  GetReviewsPayload,
  GetReviewsResponse,
} from '@/models/reviews';

import { reviewActions } from '../slices/reviewsSlice';
import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from '@redux-saga/core/effects';
import { reviewsApiClient } from '@/apis/reviewsApi';
import { notifySagaError } from '@/helpers/notifyError';

const { createReview, getReviews } = reviewsApiClient();

function* handleCreateReviewRequest(
  action: PayloadAction<CreateReviewPayload>
) {
  try {
    const response: AxiosResponse<CreateReviewResponse> = yield call(
      createReview,
      action.payload
    );

    yield put(reviewActions.createReviewSuccess(response.data));
  } catch (error) {
    notifySagaError(reviewActions.createReviewFailed, error);
    yield put(reviewActions.createReviewFailed());
  }
}

function* handleGetReviewsRequest(action: PayloadAction<GetReviewsPayload>) {
  try {
    const response: AxiosResponse<GetReviewsResponse> = yield call(
      getReviews,
      action.payload
    );

    yield put(reviewActions.getReviewsSuccess(response.data));
  } catch (error) {
    notifySagaError(reviewActions.getReviewsFailed, error);
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
