// jwt decode
import jwt_decode from 'jwt-decode';

// nookies
import nookies, { parseCookies } from 'nookies';

// types
import { JwtPayload } from 'jwt-decode';
import { GetServerSidePropsContext, NextPageContext } from 'next';

import { COOKIES } from '@/constants';
import { RefreshTokenResponse } from '@/models/auth';

const tokens = {
  checkTokenValid: (ctx: NextPageContext | GetServerSidePropsContext) => {
    const { access_token, refresh_token } = parseCookies(ctx);
    const isFully = access_token && refresh_token;

    try {
      const accessTokenDecoded: JwtPayload = jwt_decode(access_token);
      const refreshTokenDecoded: JwtPayload = jwt_decode(refresh_token);

      if (refreshTokenDecoded.exp && accessTokenDecoded.exp) {
        return {
          isAccessTokenExpired:
            new Date().getTime() >= accessTokenDecoded.exp * 1000,
          isRefreshTokenExpired:
            new Date().getTime() >= refreshTokenDecoded.exp * 1000,
          isFully,
        };
      }
    } catch (error) {
      return {
        isRefreshTokenExpired: true,
        isAccessTokenExpired: true,
        isFully: false,
      };
    }
  },

  setAccessToken: (
    ctx: NextPageContext,
    refreshTokenResponse: RefreshTokenResponse
  ) => {
    if (ctx && refreshTokenResponse) {
      const { accessToken, cookieOptions } = refreshTokenResponse;

      nookies.set(ctx, COOKIES.ACCESS_TOKEN_KEY, accessToken, cookieOptions);
    }
  },

  covertTokenObjectToString: (
    ctx: GetServerSidePropsContext | NextPageContext
  ) => {
    const { access_token, refresh_token } = parseCookies(ctx);

    return [
      COOKIES.ACCESS_TOKEN_KEY,
      '=',
      access_token,
      ';',
      COOKIES.REFRESH_TOKEN_KEY,
      '=',
      refresh_token,
    ].join('');
  },
};

export default tokens;
