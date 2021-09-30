import axios from 'axios';

import queryString from 'query-string';

import { API_URL } from '@/constants';

export const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
