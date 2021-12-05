// types
import { Loadings, Pagination, PaginationParams, Review } from './common';

export type ReviewsInitState = Pagination &
  Loadings & {
    reviews: Review[];
  };

export interface CreateReviewPayload {
  content: string;
  productId: string;
}

export interface GetReviewsPayload {
  productId: string;
  params: PaginationParams;
}

// === Responses ===
export interface CreateReviewResponse {
  success: boolean;
  message: string;
  review: Review;
}

export interface GetReviewsResponse extends Pagination {
  success: boolean;
  message: string;
  reviews: Review[];
}
