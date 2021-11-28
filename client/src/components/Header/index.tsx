import { useRouter } from 'next/router';

// clsx
import clsx from 'clsx';

import { PATHS } from '@/constants';

import HeaderWidget from './HeaderWidget';
import HeaderSearch from './HeaderSearch';
import HeaderOptions from './HeaderOptions';

// svgs
import icon from '@/assets/svgs/icon.svg';

function Header() {
  const router = useRouter();

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 z-[999]',
        'flex items-center w-full h-16 px-2 md:px-4',
        'bg-primary-v1 dark:bg-primary-v3'
      )}>
      <img
        onClick={() => router.push(PATHS.NEWSFEED)}
        src={icon.src}
        alt='Logo'
        className={clsx('w-10 md:w-12 lg:mr-2', 'cursor-pointer')}
      />

      <HeaderWidget />
      <HeaderSearch />
      <HeaderOptions />
    </header>
  );
}

export default Header;
