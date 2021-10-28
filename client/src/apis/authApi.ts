// types
import { AxiosError } from 'axios';
import { StatusResponse } from '@/models/common';
import {
  GetTokenResponse,
  LoginFormData,
  LoginResponse,
  RegisterFormData,
  RegisterResponse,
} from '@/models/auth';

import { axiosServer } from './axiosServer';
import { axiosClient } from './axiosClient';
import { notifyAxiosError } from '@/helpers/notify';
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
        return notifyAxiosError('Login user', error as AxiosError);
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
        return notifyAxiosError('Register user', error as AxiosError);
      }
    },
  };
};

export const authApiServer = (accessToken: string) => {
  const axiosInstance = axiosServer(accessToken);

  return {
    verifyToken: async (accessToken: string) => {
      try {
        const response = await axiosInstance.post<StatusResponse>(
          '/auth/verify-token',
          {
            accessToken,
          }
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Verify token', error as AxiosError);
      }
    },

    getToken: async (refreshToken: string) => {
      try {
        const response = await axiosInstance.post<GetTokenResponse>(
          '/auth/token',
          {
            refreshToken,
          }
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Get token', error as AxiosError);
      }
    },
  };
};
