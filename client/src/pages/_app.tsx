import App from 'next/app';
import Router from 'next/router';

// react overlayscrollbars
import 'overlayscrollbars/css/OverlayScrollbars.css';

// nookies
import { parseCookies } from 'nookies';

// types
import { AppContext, AppInitialProps } from 'next/app';

import { COOKIE_KEYS, PATHS } from '@/constants';
import { wrapper } from '@/redux/store';
import GlobalProvider from '../contexts/GlobalContext';
import cookies from '@/helpers/cookies';

// styles
import '../styles/globals.scss';

class WrappedApp extends App<AppInitialProps> {
  static getInitialProps = async ({ Component, ctx }: AppContext) => {
    const originalUrl = ctx.asPath;

    const parsedCookies = parseCookies(ctx);
    const hasRefreshToken = cookies.checkRefreshToken(
      parsedCookies[COOKIE_KEYS.REFRESH_TOKEN]
    );

    if (!hasRefreshToken && originalUrl !== PATHS.LOGIN) {
      if (ctx.req) {
        ctx.res?.writeHead(303, {
          Location: PATHS.LOGIN,
        });
        ctx.res?.end();
      } else {
        Router.replace(PATHS.LOGIN);
      }
    }

    const pageProps = {
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
    };

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
