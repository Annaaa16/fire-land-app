// types
import { CreateComment, GetComments } from '@/models/comments';

export const createComment = {
  request: (payload?: CreateComment) => ({
    type: 'createComment/request',
    payload,
  }),
  success: () => ({
    type: 'createComment/success',
  }),
  failure: () => ({
    type: 'createComment/failure',
  }),
};

export const getComments = {
  request: (payload?: GetComments) => ({
    type: 'getComments/request',
    payload,
  }),
  success: () => ({
    type: 'getComments/success',
  }),
  failure: () => ({
    type: 'getComments/failure',
  }),
};
