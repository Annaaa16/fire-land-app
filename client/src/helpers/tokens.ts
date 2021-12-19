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
    const tokenDecoded: JwtPayload = jwt_decode(token);

    try {
      return {
        isExpired: Boolean(
          tokenDecoded.exp && new Date().getTime() >= tokenDecoded.exp * 1000
        ),
      };
    } catch (error) {
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
