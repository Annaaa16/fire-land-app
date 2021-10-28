// types
import { AuthInitState } from './auth';
import { PostsInitState } from './posts';
import { TmdbInitState } from './tmdb';

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

export interface Movie {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: string;
  vote_average: number;
}

// === Responses ===
export interface HydrateResponse {
  auth: AuthInitState;
  posts: PostsInitState;
  tmdb: TmdbInitState;
}

export interface StatusResponse {
  success: boolean;
  message: string;
}

export interface ErrorResponse {
  success: boolean;
  message: string;
}
