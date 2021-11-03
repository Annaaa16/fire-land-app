import Router from 'next/router';

// nookies
import { parseCookies } from 'nookies';

// types
import { NextPageContext } from 'next';

import { PATHS } from '@/constants';
import { authApiServer } from '@/apis/authApi';
import { AxiosResponse } from 'axios';
import { GetTokenResponse } from '@/models/auth';
import token from './token';

export const handleAuthenticate = async (ctx: NextPageContext) => {
  const originalUrl = ctx.pathname;
  const { access_token, refresh_token } = parseCookies(ctx);
  const { isExpired } = token.verifyToken(access_token)!;
  const isFully = access_token && refresh_token;

  let isAuthenticated = false;
  let newToken = '';

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
    (!isFully || isExpired) &&
    originalUrl !== PATHS.LOGIN &&
    originalUrl !== PATHS.REGISTER
  ) {
    redirectToLocation(PATHS.LOGIN);
  }

  if (isFully && !isExpired) {
    const { verifyToken } = authApiServer(access_token);
    const response = await verifyToken(access_token);
    const success = response?.data.success;

    isAuthenticated = success || false;

    // Refresh token
    if (!success) {
      const { getToken } = authApiServer(refresh_token);

      const { data } = (await getToken(
        refresh_token
      )) as AxiosResponse<GetTokenResponse>;

      if (data.success) {
        newToken = data.accessToken;
      }
    }

    // Redirect back if try to go to login or register
    if (
      success &&
      (originalUrl === PATHS.LOGIN || originalUrl === PATHS.REGISTER)
    ) {
      redirectToLocation(PATHS.NEWSFEED);
    }
    // Invalid token
    else if (
      !success &&
      originalUrl !== PATHS.LOGIN &&
      originalUrl !== PATHS.REGISTER
    ) {
      redirectToLocation(PATHS.LOGIN);
    }
  }

  return { isAuthenticated, newToken };
};
