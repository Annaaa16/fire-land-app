// types
import { AuthInitState } from './auth';
import { PostsInitState } from './posts';
import { MoviesInitState } from './movies';
import { UsersInitState } from './users';

export interface User {
  readonly _id: string;
  username: string;
  avatar: string;
  followings: string[];
  followers: string[];
  createdAt: string;
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
  prevPage?: number | null;
  nextPage?: number | null;
  total?: number;
}

export interface Reaction {
  userId: string;
  emotion: string;
}

export interface Post {
  readonly _id: string;
  user: User;
  content: string;
  reactions: Reaction[];
  photo: string;
  photoId: string;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Movie {
  readonly id: string;
  title: string;
  image: string;
  overview: string;
  releaseDate: string;
  voteCount: number;
  popularity: number;
}

export interface TvShow {
  readonly id: string;
  title: string;
  image: string;
  overview: string;
  releaseDate: string;
  voteCount: number;
  popularity: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface Loadings {
  loadings: string[];
}

// === Responses ===
export interface HydrateResponse {
  auth: AuthInitState;
  posts: PostsInitState;
  movies: MoviesInitState;
  users: UsersInitState;
}

export interface StatusResponse {
  success: boolean;
  message: string;
}

export interface ErrorResponse {
  success: boolean;
  message: string;
}
