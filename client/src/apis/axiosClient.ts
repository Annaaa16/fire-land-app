import axios from 'axios';

// query string
import queryString from 'query-string';

import { API_URLS } from '@/constants';
import cookies from '@/helpers/cookies';
import token from '@/helpers/token';

export const axiosClient = (refreshToken?: string) => {
  const axiosInstance = axios.create({
    baseURL: API_URLS.BASE,
    headers: {
      'content-type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
  });

  axiosInstance.interceptors.request.use((config) => {
    const accessToken = cookies.getAccessToken();

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
      const { config, response } = error;
      const originalRequest = config;

      const accessToken = cookies.getAccessToken();
      const { isExpired } = token.verifyToken(accessToken!)!;

      // Token has expired
      if (response.status === 401 && !originalRequest._retry && !isExpired!) {
        originalRequest._retry = true;

        const { data } = await axiosInstance.post('/auth/token', {
          refreshToken,
        });

        // Replace new token for client side
        cookies.setAccessToken(data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        // Re-request
        return axiosInstance(originalRequest);
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
