import { ReactNode } from 'react';
import Head from 'next/head';

import { LOCAL_STORAGE } from '@/constants';
import { useGlobalContext } from '@/contexts/GlobalContext';

interface MetaProps {
  title: string;
  children: ReactNode;
}

function Meta(props: MetaProps) {
  const { title, children } = props;

  const { theme } = useGlobalContext();

  return (
    <>
      <Head>
        <meta charSet='UTF-8' />
        <meta httpEquiv='X-UA-Compatble' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>{title}</title>
      </Head>

      <div
        className={
          theme === LOCAL_STORAGE.LIGHT_THEME_VALUE
            ? LOCAL_STORAGE.LIGHT_THEME_VALUE
            : LOCAL_STORAGE.DARK_THEME_VALUE
        }>
        {children}
      </div>
    </>
  );
}

export default Meta;
