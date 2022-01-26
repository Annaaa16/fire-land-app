// types
import type { NextRequest } from 'next/server';
import { StatusResponse } from '@/models/common';

import { API_URLS, COOKIES, PATHS } from '@/constants';
import { NextResponse } from 'next/server';
import { RefreshTokenResponse } from '@/models/auth';
import { fetcher } from '@/helpers/fetcher';
import tokens from '@/helpers/tokens';

export async function middleware(req: NextRequest) {
  const { access_token, refresh_token, prev_path } = req.cookies;
  const { pathname } = req.nextUrl;

  // Avoid api call conflict from next api page
  if (pathname.startsWith(API_URLS.NEXT)) {
    return NextResponse.next();
  }

  const combinedTokens = tokens.combineTokensToString(
    access_token,
    refresh_token
  );
  const isMissingToken = !access_token || !refresh_token;
  const isAuthPath = pathname === PATHS.LOGIN || pathname === PATHS.REGISTER;

  const redirectToLogin = () => {
    return NextResponse.redirect(PATHS.LOGIN)
      .clearCookie(COOKIES.ACCESS_TOKEN_KEY)
      .clearCookie(COOKIES.REFRESH_TOKEN_KEY)
      .clearCookie(COOKIES.PREV_PATH_KEY);
  };

  const handleRefreshToken = async () => {
    const { isExpired: isRefreshTokenExpired } =
      tokens.checkTokenExpired(refresh_token);

    if (isRefreshTokenExpired) return redirectToLogin();

    try {
      if (isAuthPath) return;

      const { success, accessToken, cookieOptions } =
        await fetcher<RefreshTokenResponse>(
          '/auth/refresh-token',
          combinedTokens
        );

      if (!success) return redirectToLogin();

      return NextResponse.next().cookie(
        COOKIES.ACCESS_TOKEN_KEY,
        accessToken,
        cookieOptions
      );
    } catch (error: any) {
      console.log('Refresh token failed from middleware 👉', error.message);
      return redirectToLogin();
    }
  };

  if (isMissingToken && isAuthPath) {
    return NextResponse.next();
  }

  if (isMissingToken && !isAuthPath) {
    return redirectToLogin();
  }

  if (!isAuthPath) {
    try {
      const data = await fetcher<StatusResponse>(
        '/auth/verify-tokens',
        combinedTokens
      );

      if (!data.success && !isAuthPath) {
        return await handleRefreshToken();
      }
    } catch (error: any) {
      console.log('Verify token failed from middleware 👉', error.message);
      return redirectToLogin();
    }
  }

  // Redirect back if try to go to login or register when logged in
  if (prev_path && isAuthPath) {
    return NextResponse.redirect(prev_path || PATHS.NEWSFEED);
  }

  return NextResponse.next();
}
