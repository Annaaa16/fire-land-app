import { useState } from 'react';

// clsx
import clsx from 'clsx';

import useEventListener from '@/hooks/useEventListener';

import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';

function MoviesHeader() {
  const [isActive, setIsActive] = useState<boolean>(false);

  useEventListener('scroll', () => setIsActive(window.scrollY > 200));

  return (
    <header
      className={clsx(
        'fixed left-0 top-0 right-0 z-50',
        'transition-all duration-500 ease-out',
        'bg-gradient-to-b',
        isActive ? 'shadow-xl bg-dk-body' : 'from-[#00000094] to-transparent'
      )}>
      <div
        className={clsx(
          'container flex items-center justify-center md:justify-between py-1'
        )}>
        <HeaderLeft />
        <HeaderRight />
      </div>
    </header>
  );
}

export default MoviesHeader;
