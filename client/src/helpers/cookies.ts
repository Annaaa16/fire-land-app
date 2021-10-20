// js cookie
import cookie from 'js-cookie';

import { COOKIES } from '@/constants';

const cookies = {
  setAccessToken: (accessToken: string) => {
    cookie.set(COOKIES.ACCESS_TOKEN_KEY, accessToken);
  },
  getAccessToken: () => {
    return cookie.get(COOKIES.ACCESS_TOKEN_KEY);
  },
  setRefreshToken: (refreshToken: string) => {
    cookie.set(COOKIES.REFRESH_TOKEN_KEY, refreshToken);
  },
  getRefreshToken: () => {
    return cookie.get(COOKIES.REFRESH_TOKEN_KEY);
  },
  removeAll: () => {
    cookie.remove(COOKIES.ACCESS_TOKEN_KEY);
    cookie.remove(COOKIES.REFRESH_TOKEN_KEY);
  },
};

export default cookies;
