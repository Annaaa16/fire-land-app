// nookies
import { setCookie, parseCookies, destroyCookie } from 'nookies';

// types
import { NextPageContext } from 'next';

import { COOKIES, PATHS } from '@/constants';

const cookies = {
  setPrevPath: (ctx: NextPageContext, path: string) => {
    setCookie(ctx, COOKIES.PREV_PATH_KEY, path || PATHS.NEWSFEED);
  },

  getPrevPath: (ctx: NextPageContext) => {
    const cookies = parseCookies(ctx);

    return cookies.prev_path || PATHS.NEWSFEED;
  },

  deleteAll: (ctx: NextPageContext) => {
    destroyCookie(ctx, COOKIES.ACCESS_TOKEN_KEY);
    destroyCookie(ctx, COOKIES.REFRESH_TOKEN_KEY);
    destroyCookie(ctx, COOKIES.PREV_PATH_KEY);
  },
};

export default cookies;
