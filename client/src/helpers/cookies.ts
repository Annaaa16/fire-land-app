// nookies
import { setCookie, destroyCookie } from 'nookies';

import { COOKIES, PATHS } from '@/constants';
import cookieOptions from '@/configs/cookies';

const cookies = {
  setPrevPath(path: string) {
    destroyCookie(null, COOKIES.PREV_PATH_KEY);
    setCookie(
      null,
      COOKIES.PREV_PATH_KEY,
      path || PATHS.NEWSFEED,
      cookieOptions
    );
  },
};

export default cookies;
