// types
import { AxiosError } from 'axios';
import { StatusResponse } from '@/models/common';
import { GetServerSidePropsContext, NextPageContext } from 'next';
import {
  LoginPayload,
  LoginResponse,
  RefreshTokenResponse,
  RegisterPayload,
  RegisterResponse,
} from '@/models/auth';

import { axiosServer } from './axiosServer';
import { axiosClient } from './axiosClient';
import { notifyAxiosError } from '@/helpers/notifyError';

export const authApiClient = () => {
  const axiosInstance = axiosClient();

  return {
    registerUser: async (formData: RegisterPayload) => {
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

    loginUser: async (formData: LoginPayload) => {
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

    logoutUser: async () => {
      try {
        const response = await axiosInstance.get<StatusResponse>(
          '/auth/logout'
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Logout user', error as AxiosError);
      }
    },
  };
};

export const authApiServer = (
  ctx: GetServerSidePropsContext | NextPageContext
) => {
  const axiosInstance = axiosServer(ctx);

  return {
    verifyTokens: async () => {
      try {
        const response = await axiosInstance.get<StatusResponse>(
          '/auth/verify-tokens'
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Verify token', error as AxiosError);
      }
    },

    refreshToken: async () => {
      try {
        const response = await axiosInstance.get<RefreshTokenResponse>(
          '/auth/refresh-token'
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Refresh token', error as AxiosError);
      }
    },
  };
};
