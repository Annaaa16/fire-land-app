// types
import { PayloadAction } from '@reduxjs/toolkit';
import {
  CreateReviewPayload,
  CreateReviewResponse,
  GetReviewsPayload,
  GetReviewsResponse,
} from '@/models/reviews';

import { reviewsActions } from '../slices/reviewsSlice';
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

    yield put(reviewsActions.createReviewSuccess(response.data));
  } catch (error) {
    notifySagaError(reviewsActions.createReviewFailed, error);
    yield put(reviewsActions.createReviewFailed());
  }
}

function* handleGetReviewsRequest(action: PayloadAction<GetReviewsPayload>) {
  try {
    const response: AxiosResponse<GetReviewsResponse> = yield call(
      getReviews,
      action.payload
    );

    yield put(reviewsActions.getReviewsSuccess(response.data));
  } catch (error) {
    notifySagaError(reviewsActions.getReviewsFailed, error);
    yield put(reviewsActions.getReviewsFailed());
  }
}

function* reviewsSaga() {
  yield takeLatest(
    reviewsActions.createReviewRequest,
    handleCreateReviewRequest
  );
  yield takeLatest(reviewsActions.getReviewsRequest, handleGetReviewsRequest);
}

export default reviewsSaga;
