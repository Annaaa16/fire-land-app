// types
import {
  CreateCommentPayload,
  CreateCommentResponse,
  GetCommentsPayload,
  GetCommentsResponse,
} from '@/models/comments';

import { axiosClient } from './axiosClient';

export const commentsApiClient = () => {
  const axiosInstance = axiosClient();

  return {
    createComment(
      payload: CreateCommentPayload
    ): Promise<CreateCommentResponse> {
      return axiosInstance.post('/comments/create', payload);
    },

    getComments({
      postId,
      params,
    }: GetCommentsPayload): Promise<GetCommentsResponse> {
      return axiosInstance.get('/comments/' + postId, { params });
    },
  };
};
