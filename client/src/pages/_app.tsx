import Router from 'next/router';
import { Provider } from 'react-redux';
import { END } from '@redux-saga/core';
import App from 'next/app';

// next themes
import { ThemeProvider as NextThemeProvider } from 'next-themes';

// bar of progress
import ProgressBar from '@badrap/bar-of-progress';

// swiper
import SwiperCore, { Autoplay } from 'swiper';

// material ui core
import { ThemeProvider } from '@mui/material';

// types
import { AppContext, AppInitialProps } from 'next/app';
import { SagaStore } from '@/models/store';
import { GetUserResponse } from '@/models/users';

import { fetchUserFromServer } from '@/helpers/server';
import store, { wrapper } from '@/redux/store';
import theme from '@/configs/mui';

import MoviesProvider from '@/contexts/MoviesContext';
import GlobalProvider from '../contexts/GlobalContext';

// styles
import '../styles/globals.scss';
import 'swiper/css';
import SocketProvider from '@/contexts/SocketContext';

const progressBar = new ProgressBar({
  size: 4,
  className: 'bg-gradient-to-r from-green-200 via-green-300 to-blue-500',
});

Router.events.on('routeChangeStart', progressBar.start);
Router.events.on('routeChangeComplete', progressBar.finish);
Router.events.on('routeChangeError', progressBar.finish);

class WrappedApp extends App<
  AppInitialProps & { getUserResponse: GetUserResponse }
> {
  static getInitialProps = async ({ Component, ctx }: AppContext) => {
    const getUserResponse = await fetchUserFromServer(ctx);

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
    return { pageProps, getUserResponse };
  };

  render() {
    const { Component, pageProps, getUserResponse } = this.props;

    SwiperCore.use([Autoplay]);

    return (
      <NextThemeProvider
        attribute='class'
        forcedTheme={(Component as any).theme || null}
        disableTransitionOnChange>
        <Provider store={store}>
          <GlobalProvider getUserResponse={getUserResponse}>
            <SocketProvider>
              <MoviesProvider>
                <ThemeProvider theme={theme}>
                  <Component {...pageProps} />
                </ThemeProvider>
              </MoviesProvider>
            </SocketProvider>
          </GlobalProvider>
        </Provider>
      </NextThemeProvider>
    );
  }
}

export default wrapper.withRedux(WrappedApp);
