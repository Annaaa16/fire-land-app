// types
import { Comment, Loadings, Pagination, PaginationParams } from './common';

export interface CommentsInitState extends Loadings {
  comments: Comment[];
}

export interface CreateCommentPayload {
  postId: string;
  userId: string;
  content: string;
}

export interface GetCommentsPayload {
  postId: string;
  params: PaginationParams;
}

// === Responses ===
export interface CreateCommentResponse {
  success: boolean;
  message: string;
  comment: Comment;
}

export interface GetCommentsResponse extends Pagination {
  success: boolean;
  message: string;
  comments: Comment[];
}
