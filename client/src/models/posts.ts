// types
import { Pagination, PaginationParams, Post } from './common';

export interface PostsInitState {
  success: boolean;
  prevPage: number | null;
  nextPage: number | null;
  total: number;
  posts: Array<Post & Pagination>;
  updatePost: Post | null;
}

export interface UpdatePost {
  postId: string;
  updateData: FormData;
}

export interface GetPosts extends PaginationParams {
  user_id?: string;
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
  readonly _id: string;
  success: boolean;
  message: string;
}

export interface LikePostResponse {
  success: boolean;
  message: string;
  post: Post;
}

export interface UnlikePostResponse {
  success: boolean;
  message: string;
  post: Post;
}
