// types
import { Loadings, Pagination, PaginationParams, User } from './common';

export interface UsersInitState extends Loadings {
  currentUser: User;
  userProfile: User;
  friends: User[];
  onlineUsers: User[];
  searchedUsers: {
    prevPage: number | null;
    nextPage: number | null;
    total: number;
    users: User[];
  };
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

export interface SearchPeoplePayload extends PaginationParams {
  q: string;
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

export interface SearchPeopleResponse extends Pagination {
  success: boolean;
  message: string;
  users: User[];
}
