// types
import { AuthInitState } from './auth';
import { PostsInitState } from './posts';
import { MoviesInitState } from './movies';
import { UserResponse, UsersInitState } from './users';
import { ProductCategories, ProductsInitState } from './products';

export interface User extends UserResponse {
  isOnline?: boolean;
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

interface Sold {
  userId: string;
  count: number;
}

export interface Product {
  readonly _id: string;
  user: User;
  name: string;
  price: number;
  category: keyof ProductCategories;
  desc: string;
  photo: string;
  photoId: string;
  reactions: string[];
  sold: Sold[];
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  readonly _id: string;
  productId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: User;
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
  products: ProductsInitState;
}

export interface StatusResponse {
  success: boolean;
  message: string;
}

export interface ErrorResponse {
  success: boolean;
  message: string;
}
