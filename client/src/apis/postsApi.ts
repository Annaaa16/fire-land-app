// types
import { GetServerSidePropsContext } from 'next';
import { AxiosError } from 'axios';
import { GetPosts, UpdatePost } from '../redux/actions/posts';

import { axiosClient } from './axiosClient';
import { axiosServer } from './axiosServer';
import notifyServerError from '@/helpers/notifyServerError';
import cookies from '@/helpers/cookies';

export const postsApiClient = () => {
  const refreshToken = cookies.getRefreshToken();
  const axiosInstance = axiosClient(refreshToken);

  return {
    reqCreatePost: async (uploadData: FormData) => {
      try {
        const response = await axiosInstance.post('/posts', uploadData);

        return response;
      } catch (error) {
        return notifyServerError(error as AxiosError);
      }
    },

    reqGetPosts: async (params: GetPosts) => {
      try {
        const response = await axiosInstance.get('/posts', { params });

        return response;
      } catch (error) {
        return notifyServerError(error as AxiosError);
      }
    },

    reqUpdatePost: async (payload: UpdatePost) => {
      const { id, updateData } = payload;

      try {
        const response = await axiosInstance.put('/posts/' + id, updateData);

        return response;
      } catch (error) {
        return notifyServerError(error as AxiosError);
      }
    },

    reqDeletePost: async (payload: string) => {
      const id = payload;

      try {
        const response = await axiosInstance.delete('/posts/' + id);

        return response;
      } catch (error) {
        return notifyServerError(error as AxiosError);
      }
    },
  };
};

export const postsApiServer = (
  token: string,
  { req }: GetServerSidePropsContext
) => {
  const accessToken = req.cookies.ACCESS_TOKEN;
  const refreshToken = req.cookies.REFRESH_TOKEN;

  const axiosInstance = axiosServer(token || accessToken, refreshToken);

  return {
    reqGetPosts: async (params: GetPosts) => {
      try {
        const { data } = await axiosInstance.get('/posts', { params });

        return { data };
      } catch (error) {
        console.log('Server error get posts 👉', error);
      }
    },
  };
};
