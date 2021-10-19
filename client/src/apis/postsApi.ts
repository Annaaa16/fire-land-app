// types
import { AxiosError } from 'axios';
import {
  CreatePostsResponse,
  DeletePostResponse,
  GetPosts,
  GetPostsResponse,
  LikePostResponse,
  UpdatePost,
  UpdatePostResponse,
} from '@/models/posts';

import { axiosClient } from './axiosClient';
import { axiosServer } from './axiosServer';
import notifyServerError from '@/helpers/notifyServerError';
import cookies from '@/helpers/cookies';

export const postsApiClient = () => {
  const refreshToken = cookies.getRefreshToken();
  const axiosInstance = axiosClient(refreshToken);

  return {
    createPost: async (uploadData: FormData) => {
      try {
        const response = await axiosInstance.post<CreatePostsResponse>(
          '/posts',
          uploadData
        );

        return response;
      } catch (error) {
        return notifyServerError('Create post', error as AxiosError);
      }
    },

    getPosts: async (params: GetPosts) => {
      try {
        const response = await axiosInstance.get<GetPostsResponse>('/posts', {
          params,
        });

        return response;
      } catch (error) {
        return notifyServerError('Get posts', error as AxiosError);
      }
    },

    updatePost: async (payload: UpdatePost) => {
      const { postId, updateData } = payload;

      try {
        const response = await axiosInstance.put<UpdatePostResponse>(
          '/posts/' + postId,
          updateData
        );

        return response;
      } catch (error) {
        return notifyServerError('Update post', error as AxiosError);
      }
    },

    deletePost: async (postId: string) => {
      try {
        const response = await axiosInstance.delete<DeletePostResponse>(
          '/posts/' + postId
        );

        return response;
      } catch (error) {
        return notifyServerError('Delete post', error as AxiosError);
      }
    },

    likePost: async (postId: string) => {
      try {
        const response = await axiosInstance.patch<LikePostResponse>(
          `posts/${postId}/like`
        );

        return response;
      } catch (error) {
        return notifyServerError('Like post', error as AxiosError);
      }
    },
  };
};

export const postsApiServer = (accessToken: string) => {
  const axiosInstance = axiosServer(accessToken);

  return {
    getPosts: async (params: GetPosts) => {
      try {
        const response = await axiosInstance.get<GetPostsResponse>('/posts', {
          params,
        });

        return response;
      } catch (error) {
        return notifyServerError('Get posts', error as AxiosError);
      }
    },
  };
};
