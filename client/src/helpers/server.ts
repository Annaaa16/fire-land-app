import Router from 'next/router';

// nookies
import { parseCookies } from 'nookies';

// types
import { NextPageContext } from 'next';

import { PATHS } from '@/constants';
import { authApiServer } from '@/apis/authApi';
import token from './token';

export const redirect = async (ctx: NextPageContext) => {
  const originalUrl = ctx.pathname;

  const { access_token, refresh_token } = parseCookies(ctx);
  const { isValid, isExpired } = token.verifyToken(access_token)!;

  const isFully = access_token && refresh_token;

  const redirectToLocation = (location: string) => {
    if (ctx.req) {
      ctx.res?.writeHead(302, {
        Location: location,
        'Content-Type': 'text/html; charset=utf-8',
      });
      ctx.res?.end();
    } else {
      Router.replace(location);
    }
  };

  // Miss info or token has expired
  if (
    (!isFully || !isValid || isExpired) &&
    originalUrl !== PATHS.LOGIN &&
    originalUrl !== PATHS.REGISTER
  ) {
    redirectToLocation(PATHS.LOGIN);
  }

  if (isFully && isValid && !isExpired) {
    const { verifyToken } = authApiServer(access_token);

    const response = await verifyToken(access_token);

    // Redirect back if try to go to login or register
    if (
      response?.data.success &&
      (originalUrl === PATHS.LOGIN || originalUrl === PATHS.REGISTER)
    ) {
      redirectToLocation(PATHS.NEWSFEED);
    }
  }
};
