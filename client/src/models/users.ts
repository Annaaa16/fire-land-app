// types
import { Loadings, Pagination, PaginationParams, User } from './common';

export interface UsersInitState extends Loadings {
  currentUser: User;
  userProfile: User;
  friends: User[];
}

export interface GetFriendsPayload {
  userId: string;
  params: PaginationParams;
}

// === Responses ===
export interface GetUserResponse {
  success: boolean;
  message: string;
  user: User;
}

export interface FollowUserResponse {
  success: boolean;
  message: string;
  userId: string;
}

export interface UnfollowUserResponse {
  success: boolean;
  message: string;
  userId: string;
}

export interface GetUserFriendsResponse extends Pagination {
  success: boolean;
  message: string;
  friends: User[];
}
