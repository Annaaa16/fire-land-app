// types
import { Pagination, User } from './common';

export interface UsersInitState {
  currentUser: User;
  userProfile: User;
  fetchedFriends: User[];
}

// === Responses ===
export interface GetUserResponse {
  success: boolean;
  message: string;
  user: User;
}

export interface FollowResponse {
  success: boolean;
  message: string;
  userId: string;
}

export interface UnfollowResponse {
  success: boolean;
  message: string;
  userId: string;
}

export interface GetUserFriendsResponse extends Pagination {
  success: boolean;
  message: string;
  friends: User[];
}
