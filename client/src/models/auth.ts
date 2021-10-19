// types
import { User } from './common';

export interface AuthInitState {
  authStatus: {
    success: boolean;
    message: string;
    isAuthenticated: boolean;
  };
  registerStatus: {
    success: boolean;
    message: string;
  };
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface RegisterFormData {
  username: string;
  password: string;
  confirmPassword?: string;
  avatar: string;
}

// === Responses ===
export interface GetUserResponse {
  success: boolean;
  message: string;
  user: User;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export interface GetTokenResponse {
  success: boolean;
  accessToken: string;
}
