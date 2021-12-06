// types
import {
  CreatePostsResponse,
  DeletePostPayload,
  DeletePostResponse,
  GetPostsPayload,
  GetPostsResponse,
  ReactPostPayload,
  ReactPostResponse,
  UpdatePostPayload,
  UpdatePostResponse,
} from '@/models/posts';
import { AxiosError } from 'axios';
import { GetServerSidePropsContext, NextPageContext } from 'next';

import { axiosClient } from './axiosClient';
import { axiosServer } from './axiosServer';
import { notifyAxiosError } from '@/helpers/notifyError';

export const postsApiClient = () => {
  const axiosInstance = axiosClient();

  return {
    createPost: async (payload: FormData) => {
      try {
        const response = await axiosInstance.post<CreatePostsResponse>(
          '/posts/create',
          payload
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Create post', error as AxiosError);
      }
    },

    getPosts: async ({ userId, params }: GetPostsPayload) => {
      try {
        let response;

        if (userId) {
          response = await axiosInstance.get<GetPostsResponse>(
            '/posts/' + userId,
            {
              params,
            }
          );
        } else {
          response = await axiosInstance.get<GetPostsResponse>('/posts', {
            params,
          });
        }

        return response;
      } catch (error) {
        return notifyAxiosError('Get posts', error as AxiosError);
      }
    },

    updatePost: async ({ postId, updatePayload }: UpdatePostPayload) => {
      try {
        const response = await axiosInstance.put<UpdatePostResponse>(
          '/posts/' + postId,
          updatePayload
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Update post', error as AxiosError);
      }
    },

    deletePost: async ({ postId }: DeletePostPayload) => {
      try {
        const response = await axiosInstance.delete<DeletePostResponse>(
          '/posts/' + postId
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Delete post', error as AxiosError);
      }
    },

    reactPost: async ({ postId, userId, ...others }: ReactPostPayload) => {
      try {
        const response = await axiosInstance.patch<ReactPostResponse>(
          `/posts/${postId}/reactions`,
          others
        );

        return response;
      } catch (error) {
        return notifyAxiosError('React post', error as AxiosError);
      }
    },
  };
};

export const postsApiServer = (
  ctx: GetServerSidePropsContext | NextPageContext
) => {
  const axiosInstance = axiosServer(ctx);

  return {
    getPosts: async ({ userId, params }: GetPostsPayload) => {
      try {
        let response;

        if (userId) {
          response = await axiosInstance.get<GetPostsResponse>(
            '/posts/' + userId,
            {
              params,
            }
          );
        } else {
          response = await axiosInstance.get<GetPostsResponse>('/posts', {
            params,
          });
        }

        return response;
      } catch (error) {
        return notifyAxiosError('Get posts', error as AxiosError);
      }
    },
  };
};
