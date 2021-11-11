import Router from 'next/router';

// types
import { NextPageContext } from 'next';
import { AxiosResponse } from 'axios';
import { GetUserResponse } from '@/models/users';
import { RefreshTokenResponse } from '@/models/auth';

import { PATHS } from '@/constants';
import { authApiServer } from '@/apis/authApi';
import { usersApiServer } from '@/apis/usersApi';
import tokens from './tokens';
import cookies from './cookies';

const handleAuthentication = async (ctx: NextPageContext) => {
  const originalUrl = ctx.pathname;
  const { verifyTokens } = authApiServer(ctx);
  const { isRefreshTokenExpired, isAccessTokenExpired, isFully } =
    tokens.checkTokenValid(ctx)!;

  let isAuthenticated = false;
  let currentUserResponse: GetUserResponse | undefined;

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

  // Miss info or refresh token has expired
  if (
    (!isFully || isRefreshTokenExpired) &&
    originalUrl !== PATHS.LOGIN &&
    originalUrl !== PATHS.REGISTER
  ) {
    cookies.deleteAll(ctx);
    redirectToLocation(PATHS.LOGIN);
  } else if (isFully) {
    // Redirect back if try to go to login or register
    if (originalUrl === PATHS.LOGIN || originalUrl === PATHS.REGISTER) {
      redirectToLocation(cookies.getPrevPath(ctx));
    }

    const response = await verifyTokens();

    // Invalid tokens
    if (!response?.data.success) {
      redirectToLocation(PATHS.LOGIN);
    } else if (isAccessTokenExpired) {
      const { refreshToken } = authApiServer(ctx);

      const response =
        (await refreshToken()) as AxiosResponse<RefreshTokenResponse>;

      // Invalid refresh token or expired
      if (!response?.data.success) {
        cookies.deleteAll(ctx);
        redirectToLocation(PATHS.LOGIN);
      }
      // Set new access token
      else {
        tokens.setAccessToken(ctx, response?.data);
      }
    }

    isAuthenticated = true;
  }

  // Get current user
  if (isAuthenticated) {
    const { getCurrentUser } = usersApiServer(ctx);
    const currentUser =
      (await getCurrentUser()) as AxiosResponse<GetUserResponse>;

    currentUserResponse = currentUser?.data;
  }

  return currentUserResponse;
};

export { handleAuthentication };
