// types
import { User } from './common';

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

export interface GetUserResponse {
  success: boolean;
  message: string;
  user: User;
}
