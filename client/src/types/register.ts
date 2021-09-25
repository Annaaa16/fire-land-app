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
