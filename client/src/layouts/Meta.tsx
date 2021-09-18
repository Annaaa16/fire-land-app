import { ReactNode } from 'react';
import Head from 'next/head';

interface IProps {
  title: string;
  children: ReactNode;
}

function Meta(props: IProps) {
  const { title, children } = props;

  return (
    <>
      <Head>
        <meta charSet='UTF-8' />
        <meta httpEquiv='X-UA-Compatble' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>{title}</title>
      </Head>

      <div className='dark'>{children}</div>
    </>
  );
}

export default Meta;
