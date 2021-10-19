import axios from 'axios';

// query string
import queryString from 'query-string';

import { URLS } from '@/constants';

export const axiosServer = (accessToken?: string) => {
  const axiosInstance = axios.create({
    baseURL: URLS.API,
    headers: {
      'content-type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
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
