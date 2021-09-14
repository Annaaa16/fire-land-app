// clsx
import clsx from 'clsx';

import HeaderWidget from './HeaderWidget';
import HeaderNav from './HeaderNav';
import HeaderSearch from './HeaderSearch';
import HeaderExp from './HeaderExp';
import HeaderOptions from './HeaderOptions';

import logo from '@/assets/svgs/logo.svg';

function Header() {
  return (
    <header
      className={clsx(
        'flex items-center justify-between w-full px-2 md:px-4 py-2.5',
        'bg-primary-v1 dark:bg-primary-v3'
      )}>
      <img
        src={logo.src}
        alt='Logo'
        className={clsx('w-16 lg:w-20 lg:mr-2', 'cursor-pointer')}
      />

      <HeaderWidget />
      <HeaderNav />
      <HeaderSearch />
      <HeaderExp />
      <HeaderOptions />
    </header>
  );
}

export default Header;
