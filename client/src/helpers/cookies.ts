// js cookie
import cookie from 'js-cookie';

import { COOKIE_KEYS } from '@/constants';

const cookies = {
  setAccessToken: (accessToken: string) => {
    cookie.set(COOKIE_KEYS.ACCESS_TOKEN, accessToken);
  },
  getAccessToken: () => {
    return cookie.get(COOKIE_KEYS.ACCESS_TOKEN);
  },
  setRefreshToken: (refreshToken: string) => {
    cookie.set(COOKIE_KEYS.REFRESH_TOKEN, refreshToken);
  },
  getRefreshToken: () => {
    return cookie.get(COOKIE_KEYS.REFRESH_TOKEN);
  },
  removeAll: () => {
    cookie.remove(COOKIE_KEYS.ACCESS_TOKEN);
    cookie.remove(COOKIE_KEYS.REFRESH_TOKEN);
  },
};

export default cookies;
