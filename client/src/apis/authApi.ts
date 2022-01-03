// types
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

export const authApiClient = () => {
  const axiosInstance = axiosClient();

  return {
    registerUser(formData: RegisterPayload): Promise<RegisterResponse> {
      return axiosInstance.post('/auth/register', formData);
    },
    loginUser(formData: LoginPayload): Promise<LoginResponse> {
      return axiosInstance.post('/auth/login', formData);
    },
    logoutUser(): Promise<StatusResponse> {
      return axiosInstance.get('/auth/logout');
    },
  };
};

export const authApiServer = (
  ctx: GetServerSidePropsContext | NextPageContext
) => {
  const axiosInstance = axiosServer(ctx);

  return {
    verifyTokens(): Promise<StatusResponse> {
      return axiosInstance.get('/auth/verify-tokens');
    },

    refreshToken(): Promise<RefreshTokenResponse> {
      return axiosInstance.get('/auth/refresh-token');
    },
  };
};
