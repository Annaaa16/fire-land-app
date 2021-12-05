// types
import { AxiosError } from 'axios';
import {
  CreateCommentPayload,
  CreateCommentResponse,
  GetCommentsPayload,
  GetCommentsResponse,
} from '@/models/comments';

import { axiosClient } from './axiosClient';
import { notifyAxiosError } from '@/helpers/notifyError';

export const commentsApiClient = () => {
  const axiosInstance = axiosClient();

  return {
    createComment: async (payload: CreateCommentPayload) => {
      try {
        const response = await axiosInstance.post<CreateCommentResponse>(
          '/comments/create',
          payload
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Comment post', error as AxiosError);
      }
    },

    getComments: async (payload: GetCommentsPayload) => {
      const { postId, params } = payload;

      try {
        const response = await axiosInstance.post<GetCommentsResponse>(
          '/comments/' + postId,
          { params }
        );

        return response;
      } catch (error) {
        return notifyAxiosError('Comment post', error as AxiosError);
      }
    },
  };
};
