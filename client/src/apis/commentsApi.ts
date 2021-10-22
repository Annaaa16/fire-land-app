// types
import { AxiosError } from 'axios';
import {
  CreateComment,
  CreateCommentResponse,
  GetComments,
  GetCommentsResponse,
} from '@/models/comments';

import { axiosClient } from './axiosClient';
import cookies from '@/helpers/cookies';
import { notifyAxiosError } from '@/helpers/notify';

export const commentsApiClient = () => {
  const refreshToken = cookies.getRefreshToken();
  const axiosInstance = axiosClient(refreshToken);

  return {
    createComment: async (payload: CreateComment) => {
      try {
        const response = await axiosInstance.post<CreateCommentResponse>(
          '/comments',
          payload
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Comment post', error as AxiosError);
      }
    },

    getComments: async (payload: GetComments) => {
      const { userId, postId, params } = payload;

      try {
        const response = await axiosInstance.post<GetCommentsResponse>(
          '/comments/' + postId,
          { userId },
          { params }
        );

        return response;
      } catch (error) {
        notifyAxiosError('Comment post', error as AxiosError);
      }
    },
  };
};
