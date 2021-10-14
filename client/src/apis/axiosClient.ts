import axios from 'axios';

// query string
import queryString from 'query-string';

import { API_URL } from '@/constants';
import cookies from '@/helpers/cookies';

export const axiosClient = (refreshToken?: string) => {
  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      'content-type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
  });

  axiosInstance.interceptors.request.use((config) => {
    const token = cookies.getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const { config, response } = error;
      const originalRequest = config;

      // Expired token
      if (response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const { data } = await axiosInstance.post('/auth/token', {
          refreshToken,
        });

        // Replace new token for client side
        cookies.setAccessToken(data.accessToken);

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
