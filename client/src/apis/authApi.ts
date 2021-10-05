// types
import { GetServerSidePropsContext } from 'next';
import { LoginFormData } from '@/models/login';
import { RegisterFormData } from '@/models/register';
import { AxiosError } from 'axios';

import { axiosServer } from './axiosServer';
import notifyServerError from '@/helpers/notifyServerError';
import cookies from '@/helpers/cookies';

export const authApiClient = () => {
  const accessToken = cookies.getAccessToken();
  const refreshToken = cookies.getRefreshToken();

  const axiosInstance = axiosServer(accessToken, refreshToken);

  return {
    reqLoginUser: async (formData: LoginFormData) => {
      try {
        const response = await axiosInstance.post('/auth/login', formData);

        return response;
      } catch (error) {
        return notifyServerError(error as AxiosError);
      }
    },

    reqRegisterUser: async (formData: RegisterFormData) => {
      try {
        const response = await axiosInstance.post('/auth/register', formData);

        return response;
      } catch (error) {
        return notifyServerError(error as AxiosError);
      }
    },
  };
};

export const authApiServer = ({ req }: GetServerSidePropsContext) => {
  const accessToken = req.cookies.ACCESS_TOKEN;
  const refreshToken = req.cookies.REFRESH_TOKEN;

  const axiosInstance = axiosServer(accessToken, refreshToken);

  return {
    reqGetCurrentUser: async () => {
      try {
        const { data, config } = await axiosInstance.get('/auth/user');
        const headerToken = config?.headers.Authorization.split(' ')[1];

        return { data, accessToken: headerToken };
      } catch (error) {
        return notifyServerError(error as AxiosError);
      }
    },
  };
};
