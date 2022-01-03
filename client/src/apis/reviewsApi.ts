// types
import {
  CreateReviewPayload,
  CreateReviewResponse,
  GetReviewsPayload,
  GetReviewsResponse,
} from '@/models/reviews';

import { axiosClient } from './axiosClient';

export const reviewsApiClient = () => {
  const axiosInstance = axiosClient();

  return {
    createReview(payload: CreateReviewPayload): Promise<CreateReviewResponse> {
      return axiosInstance.post('/reviews/create', payload);
    },

    getReviews({
      productId,
      params,
    }: GetReviewsPayload): Promise<GetReviewsResponse> {
      return axiosInstance.get('/reviews/' + productId, {
        params,
      });
    },
  };
};
