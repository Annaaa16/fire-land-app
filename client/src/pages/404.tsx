import { useRouter } from 'next/router';
import Image from 'next/image';

// clsx
import clsx from 'clsx';

import Meta from '@/layouts/Meta';
import Header from '@/components/Header';

import { PATHS } from '@/constants';

// svgs
import notFound from '@/assets/svgs/404.svg';

function Custom404() {
  const router = useRouter();

  return (
    <Meta title='Not Found'>
      <Header />
      <div className='flex-center flex-col h-screen'>
        <div className={clsx('relative', 'w-28 h-28 mb-2')}>
          <Image
            src={notFound.src}
            layout='fill'
            alt='Not Found'
            objectFit='cover'
            priority={true}
          />
        </div>
        <h1
          className={clsx(
            'font-semibold text-lg leading-none mb-4',
            'dark:text-gray'
          )}>
          This Page Isn't Available
        </h1>
        <p className={clsx('mb-4', 'dark:text-gray')}>
          Check to see if the link you're trying to open is correct.
        </p>
        <button
          onClick={() => router.push(PATHS.NEWSFEED)}
          className={clsx('btn btn--primary flex-center p-3 rounded-lg')}>
          Go to News Feed
        </button>
      </div>
    </Meta>
  );
}

export default Custom404;
