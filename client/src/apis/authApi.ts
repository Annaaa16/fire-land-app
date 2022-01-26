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
import { axiosNext } from './axiosNext';

export const authApiNext = () => {
  const axiosInstance = axiosNext();

  return {
    loginUser(payload: LoginPayload): Promise<LoginResponse> {
      return axiosInstance.post('/auth/login', payload);
    },
  };
};

export const authApiClient = () => {
  const axiosInstance = axiosClient();

  return {
    registerUser(payload: RegisterPayload): Promise<RegisterResponse> {
      return axiosInstance.post('/auth/register', payload);
    },

    loginUser(payload: LoginPayload): Promise<LoginResponse> {
      return axiosInstance.post('/auth/login', payload);
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
