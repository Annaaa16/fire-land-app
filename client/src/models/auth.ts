// types
import { User } from './common';

interface CurrentUser {
  readonly _id: string;
  username: string;
  avatar: string;
  isAuthenticated: boolean;
  message: string;
  success: boolean;
}

interface RegisterStatus {
  success: boolean;
  message: string;
}

export interface AuthInitState {
  currentUser: CurrentUser;
  registerStatus: RegisterStatus;
}

export interface GetUserResponse {
  success: boolean;
  message: string;
  user: User;
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterFormData {
  username: string;
  password: string;
  confirmPassword?: string;
  avatar: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export interface GetCurrentUserResponse {
  success: boolean;
  message: string;
  user: User;
}
