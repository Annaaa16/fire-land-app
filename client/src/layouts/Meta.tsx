import Head from 'next/head';

// clsx
import clsx from 'clsx';

// types
import { ReactNode } from 'react';

import { COLORS, LOCAL_STORAGE } from '@/constants';
import { useGlobalContext } from '@/contexts/GlobalContext';

interface MetaProps {
  title: string;
  children: ReactNode;
  backgroundColor?: string;
}

function Meta(props: MetaProps) {
  const { title, children, backgroundColor } = props;

  const { theme } = useGlobalContext();

  return (
    <>
      <Head>
        <meta charSet='UTF-8' />
        <meta httpEquiv='X-UA-Compatble' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>{title}</title>
      </Head>

      <main
        className={clsx(
          theme === LOCAL_STORAGE.LIGHT_THEME_VALUE
            ? LOCAL_STORAGE.LIGHT_THEME_VALUE
            : LOCAL_STORAGE.DARK_THEME_VALUE
        )}>
        {children}
      </main>

      <style jsx global>{`
        body {
          background-color: ${backgroundColor
            ? backgroundColor
            : theme === LOCAL_STORAGE.LIGHT_THEME_VALUE
            ? COLORS.LIGHT_BODY
            : COLORS.DARK_BODY};
        }
      `}</style>
    </>
  );
}

export default Meta;
