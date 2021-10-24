// clsx
import clsx from 'clsx';

import HeaderWidget from './HeaderWidget';
import HeaderSearch from './HeaderSearch';
import HeaderOptions from './HeaderOptions';

import icon from '@/assets/svgs/icon.svg';

function Header() {
  return (
    <header
      className={clsx(
        'fixed top-0 left-0 z-[999]',
        'flex items-center justify-between w-full h-[64px] px-2 md:px-4 py-2.5',
        'bg-primary-v1 dark:bg-primary-v3'
      )}>
      <img
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
