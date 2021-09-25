export interface LoginFormData {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user: {
    readonly _id: string;
    username: string;
    avatar: string;
  };
  accessToken: string;
  refreshToken: string;
}
