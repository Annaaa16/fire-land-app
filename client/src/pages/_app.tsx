import App from 'next/app';
import Router from 'next/router';

// react overlayscrollbars
import 'overlayscrollbars/css/OverlayScrollbars.css';

// nookies
import { parseCookies } from 'nookies';

// types
import { AppContext, AppInitialProps } from 'next/app';
import { END } from '@redux-saga/core';
import { SagaStore } from '@/redux/types';

import { COOKIE_KEYS, PATHS } from '@/constants';
import { wrapper } from '@/redux/store';
import { authApiServer } from '@/apis/authApi';
import GlobalProvider from '../contexts/GlobalContext';

// styles
import '../styles/globals.scss';

class WrappedApp extends App<AppInitialProps> {
  static getInitialProps = async ({ Component, ctx }: AppContext) => {
    const originalUrl = ctx.asPath;

    const parsedCookies = parseCookies(ctx);

    const { reqValidateRefreshToken } = authApiServer();

    const { success } = await reqValidateRefreshToken(
      parsedCookies[COOKIE_KEYS.REFRESH_TOKEN]
    );

    // Invalid or not exists refresh token
    if (!success && originalUrl !== PATHS.LOGIN) {
      if (ctx.req) {
        ctx.res?.writeHead(303, {
          Location: PATHS.LOGIN,
        });
        ctx.res?.end();
      } else {
        Router.replace(PATHS.LOGIN);
      }
    }

    // Redirect if try to go to login
    if (success && originalUrl === PATHS.LOGIN) {
      if (ctx.req) {
        ctx.res?.writeHead(303, {
          Location: PATHS.NEWSFEED,
        });
        ctx.res?.end();
      } else {
        Router.replace(PATHS.NEWSFEED);
      }
    }

    // Wait for all page actions to dispatch
    if (ctx.req) {
      ctx.store?.dispatch(END);
      await (ctx.store as SagaStore)?.sagaTask?.toPromise();
    }

    // Stop the saga if on server
    const pageProps = {
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
    };

    // Return props
    return {
      pageProps,
    };
  };

  render() {
    const { Component, pageProps } = this.props;

    return (
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
    );
  }
}

export default wrapper.withRedux(WrappedApp);
