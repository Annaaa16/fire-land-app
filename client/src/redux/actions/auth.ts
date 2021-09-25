// types
import { LoginFormData } from '@/types/login';
import { RegisterFormData } from '@/types/register';

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
