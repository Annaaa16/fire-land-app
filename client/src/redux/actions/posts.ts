// types
import { GetPosts, UpdatePost } from '@/models/posts';

export const createPost = {
  request: (payload?: FormData) => ({
    type: 'createPost/request',
    payload,
  }),
  success: () => ({
    type: 'createPost/success',
  }),
  failure: () => ({
    type: 'createPost/failure',
  }),
};

export const getPosts = {
  request: (payload?: GetPosts) => ({
    type: 'getPosts/request',
    payload,
  }),
  success: () => ({
    type: 'getPosts/success',
  }),
  failure: () => ({
    type: 'getPosts/failure',
  }),
};

export const updatePost = {
  request: (payload?: UpdatePost) => ({
    type: 'updatePost/request',
    payload,
  }),
  success: () => ({
    type: 'updatePost/success',
  }),
  failure: () => ({
    type: 'updatePost/failure',
  }),
};

export const deletePost = {
  request: (payload?: string) => ({
    type: 'deletePost/request',
    payload,
  }),
  success: () => ({
    type: 'deletePost/success',
  }),
  failure: () => ({
    type: 'deletePost/failure',
  }),
};

export const likePost = {
  request: (payload?: string) => ({
    type: 'likePost/request',
    payload,
  }),
  success: () => ({
    type: 'likePost/success',
  }),
  failure: () => ({
    type: 'likePost/failure',
  }),
};

export const unlikePost = {
  request: (payload?: string) => ({
    type: 'unlikePost/request',
    payload,
  }),
  success: () => ({
    type: 'unlikePost/success',
  }),
  failure: () => ({
    type: 'unlikePost/failure',
  }),
};
