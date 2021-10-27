// clsx
import clsx from 'clsx';

import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';

function MoviesHeader() {
  return (
    <header
      className={clsx(
        'fixed left-0 top-0 right-0 z-50',
        'bg-gradient-to-b from-[#00000094] to-transparent'
      )}>
      <div
        className={clsx(
          'container flex items-center justify-center md:justify-between py-3'
        )}>
        <HeaderLeft />
        <HeaderRight />
      </div>
    </header>
  );
}

export default MoviesHeader;
