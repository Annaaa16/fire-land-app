import { Provider } from 'react-redux';
import { END } from '@redux-saga/core';
import App from 'next/app';

// types
import { AppContext, AppInitialProps } from 'next/app';
import { SagaStore } from '@/models/store';

import { redirect } from '@/helpers/server';
import store, { wrapper } from '@/redux/store';
import GlobalProvider from '../contexts/GlobalContext';

// styles
import '../styles/globals.scss';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import 'swiper/css';

class WrappedApp extends App<AppInitialProps> {
  static getInitialProps = async ({ Component, ctx }: AppContext) => {
    // Init check
    await redirect(ctx);

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
      <Provider store={store}>
        <GlobalProvider>
          <Component {...pageProps} />
        </GlobalProvider>
      </Provider>
    );
  }
}

export default wrapper.withRedux(WrappedApp);
