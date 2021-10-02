import { AppProps } from 'next/app';

import { wrapper } from '@/redux/store';
import GlobalProvider from '../contexts/GlobalContext';

// react overlayscrollbars
import 'overlayscrollbars/css/OverlayScrollbars.css';

// styles
import '../styles/globals.scss';

function WrappedApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  );
}

export default wrapper.withRedux(WrappedApp);
