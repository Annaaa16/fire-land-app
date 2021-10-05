import axios from 'axios';

// query string
import queryString from 'query-string';

import { API_URL } from '@/constants';

export const axiosServer = (accessToken?: string, refreshToken?: string) => {
  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      'content-type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
  });

  axiosInstance.interceptors.request.use((config) => {
    const headerToken = config.headers['Authorization'];

    config.headers.Authorization = headerToken || `Bearer ${accessToken}`;

    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const { config, response } = error;
      const originalRequest = config;

      // Invalid token
      if (response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;

        const { data } = await axiosInstance.post('/auth/token', {
          refreshToken,
        });

        // Attach new token to header for re-request
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        // Re-request
        return axiosInstance(originalRequest);
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
