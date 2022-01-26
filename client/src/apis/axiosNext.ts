import axios from 'axios';

// types
import { AxiosResponse, AxiosError } from 'axios';
import { ErrorResponse } from '@/models/common';

import { API_URLS } from '@/constants';

export const axiosNext = () => {
  const axiosInstance = axios.create({
    baseURL: API_URLS.NEXT,
    headers: {
      'content-type': 'application/json',
    },
    withCredentials: true,
  });

  axiosInstance.interceptors.request.use((config) => {
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      if (response?.data) {
        return response.data;
      }
    },
    (error: AxiosError): ErrorResponse => {
      if (error.response?.data) {
        return error.response?.data;
      }

      return { success: false, message: 'Please try again later' };
    }
  );

  return axiosInstance;
};
