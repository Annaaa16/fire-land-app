import axios from 'axios';

// query string
import queryString from 'query-string';

// types
import { GetServerSidePropsContext, NextPageContext } from 'next';

import { API_URLS } from '@/constants';
import tokens from '@/helpers/tokens';

export const axiosServer = (
  ctx: GetServerSidePropsContext | NextPageContext
) => {
  const axiosInstance = axios.create({
    baseURL: API_URLS.BASE,
    headers: {
      'content-type': 'application/json',
      Cookie: tokens.covertTokenObjectToString(ctx),
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
