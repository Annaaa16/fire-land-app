// types
import { AuthInitState } from './auth';
import { PostsInitState } from './posts';

export interface User {
  readonly _id: string;
  username: string;
  avatar: string;
}

export interface Post {
  readonly _id: string;
  user: User;
  content: string;
  likeCount: number;
  photo: string;
  photoId: string;
}

export interface HydrateResponse {
  auth: AuthInitState;
  posts: PostsInitState;
}

export interface ErrorResponse {
  success: boolean;
  message: string;
}
