import { AxiosError } from 'axios';

import { GetPosts, UpdatePost } from '../redux/actions/posts';

import { axiosClient } from './axiosClient';
import notifyServerError from '@/helpers/notifyServerError';

export const reqCreatePost = async (uploadData: FormData) => {
  try {
    const response = await axiosClient.post('/posts', uploadData);

    return response;
  } catch (error) {
    return notifyServerError(error as AxiosError);
  }
};

export const reqGetPosts = async (params: GetPosts) => {
  try {
    const response = await axiosClient.get('/posts', { params });

    return response;
  } catch (error) {
    return notifyServerError(error as AxiosError);
  }
};

export const reqUpdatePost = async (payload: UpdatePost) => {
  const { id, updateData } = payload;

  try {
    const response = await axiosClient.put('/posts/' + id, updateData);

    return response;
  } catch (error) {
    return notifyServerError(error as AxiosError);
  }
};

export const reqDeletePost = async (payload: string) => {
  const id = payload;

  try {
    const response = await axiosClient.delete('/posts/' + id);

    return response;
  } catch (error) {
    return notifyServerError(error as AxiosError);
  }
};
