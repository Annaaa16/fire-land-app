import axios from 'axios';

// query string
import querystring from 'query-string';

// types
import { AxiosResponse } from 'axios';

import tmdb from '../configs/tmdb';

export const axiosTmdb = axios.create({
  baseURL: tmdb.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) =>
    querystring.stringify({ ...params, api_key: tmdb.apiKey }),
});

axiosTmdb.interceptors.response.use((response: AxiosResponse) => {
  if (response?.data) {
    return response.data;
  }
});
