import axios from 'axios';

// query string
import queryString from 'query-string';

import { API_URLS } from '@/constants';

export const axiosClient = () => {
  const axiosInstance = axios.create({
    baseURL: API_URLS.BASE,
    headers: {
      'content-type': 'application/json',
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params),
  });

  axiosInstance.interceptors.request.use((config) => {
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      if (response && response.data) {
        return response;
      }
    },
    async (error) => {
      throw error;
    }
  );

  return axiosInstance;
};
