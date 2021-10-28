import axios from 'axios';

// query string
import queryString from 'query-string';

import { API_URLS } from '@/constants';

export const axiosServer = (accessToken?: string) => {
  const axiosInstance = axios.create({
    baseURL: API_URLS.BASE,
    headers: {
      'content-type': 'application/json',
    },
    paramsSerializer: (params) => {
      return queryString.stringify(params);
    },
  });

  axiosInstance.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
