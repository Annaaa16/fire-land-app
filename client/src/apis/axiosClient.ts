import axios from 'axios';

// types
import { AxiosResponse, AxiosError } from 'axios';
import { StatusResponse } from '@/models/common';

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
    (response: AxiosResponse) => {
      if (response?.data) {
        return response.data;
      }
    },
    (error: AxiosError): StatusResponse => {
      if (error?.response?.data) {
        return error.response?.data;
      }

      return { success: false, message: 'Please try again' };
    }
  );

  return axiosInstance;
};
