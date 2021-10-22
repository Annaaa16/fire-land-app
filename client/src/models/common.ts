// types
import { AuthInitState } from './auth';
import { PostsInitState } from './posts';

export interface User {
  readonly _id: string;
  username: string;
  avatar: string;
  followings: string[];
  followers: string[];
}

export interface Comment {
  readonly _id: string;
  postId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface Pagination {
  prevPage?: number;
  nextPage?: number;
  total?: number;
}

export interface Post {
  readonly _id: string;
  user: User;
  content: string;
  likes: string[];
  photo: string;
  photoId: string;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}

// === Responses ===
export interface HydrateResponse {
  auth: AuthInitState;
  posts: PostsInitState;
}

export interface SuccessResponse {
  success: boolean;
  message: string;
}

export interface ErrorResponse {
  success: boolean;
  message: string;
}
