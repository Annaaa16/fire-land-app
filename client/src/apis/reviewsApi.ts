// types
import {
  CreateReviewPayload,
  CreateReviewResponse,
  GetReviewsPayload,
  GetReviewsResponse,
} from '@/models/reviews';
import { AxiosError } from 'axios';

import { axiosClient } from './axiosClient';
import { notifyAxiosError } from '@/helpers/notifyError';

export const reviewsApiClient = () => {
  const axiosInstance = axiosClient();

  return {
    createReview: async (payload: CreateReviewPayload) => {
      try {
        const response = await axiosInstance.post<CreateReviewResponse>(
          '/reviews/create',
          payload
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Review product', error as AxiosError);
      }
    },

    getReviews: async (payload: GetReviewsPayload) => {
      const { productId, params } = payload;

      try {
        const response = await axiosInstance.get<GetReviewsResponse>(
          '/reviews/' + productId,
          { params }
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Get product reviews', error as AxiosError);
      }
    },
  };
};
