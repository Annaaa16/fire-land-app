// types
import { Post } from './common';

export interface PostsInitState {
  success: boolean;
  prevPage: number | null;
  nextPage: number | null;
  total: number;
  posts: Post[];
  updatePost: Post | null;
}

export interface GetPosts {
  page: number;
  limit: number;
}

export interface UpdatePost {
  postId: string;
  updateData: FormData;
}

// === Responses ===
export interface CreatePostsResponse {
  success: boolean;
  message: string;
  post: Post;
}

export interface GetPostsResponse {
  success: boolean;
  prevPage: number | null;
  nextPage: number | null;
  total: number;
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
