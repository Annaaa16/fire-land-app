interface CurrentUser {
  readonly id: string;
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
