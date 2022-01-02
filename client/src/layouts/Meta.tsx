import Head from 'next/head';

// types
import { ReactNode } from 'react';

interface MetaProps {
  title: string;
  children: ReactNode;
}

function Meta(props: MetaProps) {
  const { title, children } = props;

  return (
    <>
      <Head>
        <meta charSet='UTF-8' />
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta
          name='description'
          content='Fire Land App - Best social network in github not world 😄'
        />
        <title>{title}</title>
      </Head>

      {children}
    </>
  );
}

export default Meta;
