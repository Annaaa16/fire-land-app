// types
import { Post } from './common';

export interface GetPostsResponse {
  success: boolean;
  prevPage: number | null;
  nextPage: number | null;
  total: number;
  posts: Post[];
}

export interface UploadPostResponse {
  success: boolean;
  message: string;
  post: Post;
}

export interface DeletePostResponse {
  success: boolean;
  message: string;
  id: string;
}
