import { Provider } from 'react-redux';
import { END } from '@redux-saga/core';
import App from 'next/app';

// swiper
import SwiperCore, { Autoplay } from 'swiper';

// material ui core
import { ThemeProvider } from '@mui/material';

// types
import { AppContext, AppInitialProps } from 'next/app';
import { SagaStore } from '@/models/store';
import { GetUserResponse } from '@/models/users';

import { handleAuthentication } from '@/helpers/server';
import store, { wrapper } from '@/redux/store';
import theme from '@/configs/materialUI';

import GlobalProvider from '../contexts/GlobalContext';

// styles
import '../styles/globals.scss';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import 'swiper/css';

class WrappedApp extends App<
  AppInitialProps & { currentUserResponse: GetUserResponse }
> {
  static getInitialProps = async ({ Component, ctx }: AppContext) => {
    // Init check
    const currentUserResponse = await handleAuthentication(ctx);

    // console.log('getInitialProps =>', ctx.req);

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
