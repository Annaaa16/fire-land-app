// types
import { Loadings, User } from './common';

export interface AuthInitState extends Loadings {
  loginStatus: {
    success: boolean;
    message: string;
  };
  registerStatus: {
    success: boolean;
    message: string;
  };
  isAuthenticated: boolean;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  password: string;
  confirmPassword?: string;
  avatar?: string;
}

// === Responses ===
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

export interface RefreshTokenResponse {
  success: boolean;
  message: string;
  accessToken: string;
  cookieOptions: any;
}
