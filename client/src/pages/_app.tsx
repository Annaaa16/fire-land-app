import Router from 'next/router';
import { Provider } from 'react-redux';
import { END } from '@redux-saga/core';
import App from 'next/app';

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

import GlobalProvider from '../contexts/GlobalContext';

// styles
import '../styles/globals.scss';
import 'swiper/css';

const progressBar = new ProgressBar({
  size: 4,
  className: 'bg-gradient-to-r from-green-200 via-green-300 to-blue-500',
});

Router.events.on('routeChangeStart', progressBar.start);
Router.events.on('routeChangeComplete', progressBar.finish);
Router.events.on('routeChangeError', progressBar.finish);

class WrappedApp extends App<
  AppInitialProps & { currentUserResponse: GetUserResponse }
> {
  static getInitialProps = async ({ Component, ctx }: AppContext) => {
    // Init check
    const currentUserResponse = await fetchUserFromServer(ctx);

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
    return { pageProps, currentUserResponse };
  };

  render() {
    const { Component, pageProps, currentUserResponse } = this.props;

    SwiperCore.use([Autoplay]);

    return (
      <Provider store={store}>
        <GlobalProvider currentUserResponse={currentUserResponse}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </GlobalProvider>
      </Provider>
    );
  }
}

export default wrapper.withRedux(WrappedApp);
