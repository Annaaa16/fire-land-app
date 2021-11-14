// types
import { Comment, Loadings, Pagination } from './common';

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
  userId: string;
  params: {
    page: number;
    limit: number;
  };
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
