// types
import { User } from './common';

interface CurrentUser {
  readonly _id: string;
  username: string;
  avatar: string;
  followings: string[];
  followers: string[];
}

export interface UsersInitState {
  currentUser: CurrentUser;
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
