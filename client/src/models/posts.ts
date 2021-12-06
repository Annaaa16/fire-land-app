// types
import { Loadings, Pagination, PaginationParams, Post } from './common';

export interface PostsInitState extends Loadings {
  isOpenFormSender: boolean;
  prevPage: number | null;
  nextPage: number | null;
  total: number;
  posts: Array<Post & Pagination>;
  updatePost: Post | null;
}

export interface UpdatePostPayload {
  postId: string;
  updatePayload: FormData;
}

export interface GetPostsPayload {
  userId?: string;
  params: PaginationParams;
}

export interface DeletePostPayload {
  postId: string;
}

export interface ReactPostPayload {
  postId: string;
  userId: string;
  isReact: boolean;
  isUpdate: boolean;
  emotion: string;
}

// === Responses ===
export interface CreatePostsResponse {
  success: boolean;
  message: string;
  post: Post;
}

export interface GetPostsResponse extends Pagination {
  success: boolean;
  message: string;
  posts: Post[];
}

export interface UpdatePostResponse {
  success: boolean;
  message: string;
  post: Post;
}

export interface DeletePostResponse {
  readonly postId: string;
  success: boolean;
  message: string;
}

export interface ReactPostResponse {
  success: boolean;
  message: string;
  post: Post;
}
