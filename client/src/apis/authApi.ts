// types
import { AxiosError } from 'axios';
import { SuccessResponse } from '@/models/common';
import {
  GetTokenResponse,
  LoginFormData,
  LoginResponse,
  RegisterFormData,
  RegisterResponse,
} from '@/models/auth';

import { axiosServer } from './axiosServer';
import { axiosClient } from './axiosClient';
import notifyServerError from '@/helpers/notifyServerError';
import cookies from '@/helpers/cookies';

export const authApiClient = () => {
  const refreshToken = cookies.getRefreshToken();

  const axiosInstance = axiosClient(refreshToken);

  return {
    loginUser: async (formData: LoginFormData) => {
      try {
        const response = await axiosInstance.post<LoginResponse>(
          '/auth/login',
          formData
        );

        return response;
      } catch (error) {
        return notifyServerError('Login user', error as AxiosError);
      }
    },

    registerUser: async (formData: RegisterFormData) => {
      try {
        const response = await axiosInstance.post<RegisterResponse>(
          '/auth/register',
          formData
        );

        return response;
      } catch (error) {
        return notifyServerError('Register user', error as AxiosError);
      }
    },
  };
};

export const authApiServer = (accessToken: string) => {
  const axiosInstance = axiosServer(accessToken);

  return {
    verifyToken: async (accessToken: string) => {
      try {
        const response = await axiosInstance.post<SuccessResponse>(
          'auth/verify-token',
          {
            accessToken,
          }
        );

        return response;
      } catch (error) {
        return notifyServerError('Verify token', error as AxiosError);
      }
    },

    getToken: async (refreshToken: string) => {
      try {
        const response = await axiosInstance.post<GetTokenResponse>(
          'auth/token',
          {
            refreshToken,
          }
        );

        return response;
      } catch (error) {
        return notifyServerError('Get token', error as AxiosError);
      }
    },
  };
};
