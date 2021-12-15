// types
import { Loadings, Pagination, PaginationParams, User } from './common';

export interface UsersInitState extends Loadings {
  currentUser: User;
  userProfile: User;
  friends: User[];
  onlineUsers: User[];
}

export interface AddFriendUserPayload {
  userId: string;
}

export interface UnfriendUserPayload {
  userId: string;
}

export interface FollowUserPayload {
  userId: string;
}

export interface UnfollowUserPayload {
  userId: string;
}

export interface GetFriendsPayload {
  userId: string;
  params: PaginationParams;
}

// === Responses ===
export interface UserResponse {
  readonly _id: string;
  username: string;
  avatar: string;
  friends: string[];
  followings: string[];
  followers: string[];
  createdAt: string;
  updatedAt: string;
}

export interface GetUserResponse {
  success: boolean;
  message: string;
  user: User;
}

export interface AddFriendUserResponse {
  success: boolean;
  message: string;
  user: User;
}

export interface UnfriendUserResponse {
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
