// types
import { LoginFormData } from '@/models/login';
import { RegisterFormData } from '@/models/register';

export const loginUser = (payload?: LoginFormData) => {
  return {
    type: 'LOGIN_USER',
    payload,
  };
};

export const registerUser = (payload?: RegisterFormData) => {
  return {
    type: 'REGISTER_USER',
    payload,
  };
};
