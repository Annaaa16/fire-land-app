// types
import { Comment, Pagination } from './common';

export interface CommentsInitState {
  comments: Comment[];
}

export interface CreateComment {
  postId: string;
  userId: string;
  content: string;
}

export interface GetComments {
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
