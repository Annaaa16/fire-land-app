// jwt decode
import jwt_decode from 'jwt-decode';

// nookies
import { parseCookies } from 'nookies';

// types
import { JwtPayload } from 'jwt-decode';
import { GetServerSidePropsContext, NextPageContext } from 'next';

import { COOKIES } from '@/constants';

const tokens = {
  checkTokenMissing(ctx: NextPageContext) {
    const { access_token, refresh_token } = parseCookies(ctx);

    return { isMissing: !access_token || !refresh_token };
  },

  checkTokenExpired(token: string) {
    try {
      const tokenDecoded: JwtPayload = jwt_decode(token);

      return {
        isExpired: Boolean(
          tokenDecoded.exp && new Date().getTime() >= tokenDecoded.exp * 1000
        ),
      };
    } catch (error: any) {
      console.log('Decode token error 👉', error?.message);
      return {
        isExpired: true,
      };
    }
  },

  combineTokensToString(accessToken: string, refreshToken: string) {
    return [
      COOKIES.ACCESS_TOKEN_KEY,
      '=',
      accessToken,
      ';',
      COOKIES.REFRESH_TOKEN_KEY,
      '=',
      refreshToken,
    ].join('');
  },

  covertTokenObjectToString(ctx: GetServerSidePropsContext | NextPageContext) {
    const { access_token, refresh_token } = parseCookies(ctx);

    return this.combineTokensToString(access_token, refresh_token);
  },
};

export default tokens;
