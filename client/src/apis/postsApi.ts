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
import { GetServerSidePropsContext, NextPageContext } from 'next';

import { axiosClient } from './axiosClient';
import { axiosServer } from './axiosServer';

export const postsApiClient = () => {
  const axiosInstance = axiosClient();

  return {
    createPost(payload: FormData): Promise<CreatePostsResponse> {
      return axiosInstance.post('/posts/create', payload);
    },

    getPosts({ userId, params }: GetPostsPayload): Promise<GetPostsResponse> {
      if (userId) {
        return axiosInstance.get('/posts/' + userId, {
          params,
        });
      }

      return axiosInstance.get('/posts', {
        params,
      });
    },

    updatePost({
      postId,
      updatePayload,
    }: UpdatePostPayload): Promise<UpdatePostResponse> {
      return axiosInstance.put('/posts/' + postId, updatePayload);
    },

    deletePost({ postId }: DeletePostPayload): Promise<DeletePostResponse> {
      return axiosInstance.delete('/posts/' + postId);
    },

    reactPost({
      postId,
      userId,
      ...others
    }: ReactPostPayload): Promise<ReactPostResponse> {
      return axiosInstance.patch(`/posts/${postId}/reactions`, others);
    },
  };
};

export const postsApiServer = (
  ctx: GetServerSidePropsContext | NextPageContext
) => {
  const axiosInstance = axiosServer(ctx);

  return {
    getPosts({ userId, params }: GetPostsPayload): Promise<GetPostsResponse> {
      if (userId) {
        return axiosInstance.get('/posts/' + userId, {
          params,
        });
      }

      return axiosInstance.get('/posts', {
        params,
      });
    },
  };
};
