import { axiosClient } from './axiosClient';

// types
import { LoginFormData } from '@/models/login';
import { RegisterFormData } from '@/models/register';
import { AxiosError } from 'axios';

import notifyServerError from '@/helpers/notifyServerError';

export const reqLoginUser = async (formData: LoginFormData) => {
  try {
    const response = await axiosClient.post('/auth/login', formData);

    return response;
  } catch (error) {
    return notifyServerError(error as AxiosError);
  }
};

export const reqRegisterUser = async (formData: RegisterFormData) => {
  try {
    const response = await axiosClient.post('/auth/register', formData);

    return response;
  } catch (error) {
    return notifyServerError(error as AxiosError);
  }
};
