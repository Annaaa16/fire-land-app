// types
import { LoginFormData, RegisterFormData } from '@/models/auth';

export const loginUser = {
  request: (payload?: LoginFormData) => ({
    type: 'loginUser/request',
    payload,
  }),
  success: () => ({
    type: 'loginUser/success',
  }),
  failure: () => ({
    type: 'loginUser/failure',
  }),
};

export const registerUser = {
  request: (payload?: RegisterFormData) => ({
    type: 'registerUser/request',
    payload,
  }),
  success: () => ({
    type: 'registerUser/success',
  }),
  failure: () => ({
    type: 'registerUser/failure',
  }),
};
