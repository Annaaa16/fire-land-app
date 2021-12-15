// nookies
import { setCookie, parseCookies, destroyCookie } from 'nookies';

// types
import { NextPageContext } from 'next';

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

  getPrevPath(ctx: NextPageContext) {
    const cookies = parseCookies(ctx);

    return cookies.prev_path || PATHS.NEWSFEED;
  },

  deleteAll(ctx: NextPageContext | null) {
    destroyCookie(ctx, COOKIES.ACCESS_TOKEN_KEY);
    destroyCookie(ctx, COOKIES.REFRESH_TOKEN_KEY);
    destroyCookie(ctx, COOKIES.PREV_PATH_KEY);
  },
};

export default cookies;
