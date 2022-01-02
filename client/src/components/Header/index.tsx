// clsx
import clsx from 'clsx';

import HeaderLeft from './HeaderLeft';
import HeaderMiddle from './HeaderMiddle';
import HeaderRight from './HeaderRight';

function Header() {
  return (
    <header
      className={clsx(
        'fixed top-0 left-0 z-[999]',
        'header flex items-center w-full px-2 md:px-4',
        'bg-primary-v1 dark:bg-primary-v3'
      )}>
      <HeaderLeft />
      <HeaderMiddle />
      <HeaderRight />
    </header>
  );
}

export default Header;
