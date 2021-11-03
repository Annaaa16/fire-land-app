import { useRouter } from 'next/router';

// clsx
import clsx from 'clsx';

import { PATHS } from '@/constants';

import logo from '@/assets/svgs/icon.svg';

function HeaderLeft() {
  const router = useRouter();

  return (
    <div className={clsx('flex items-center')}>
      <div
        onClick={() => router.push(PATHS.MOVIES)}
        className={clsx('w-11 mr-6', 'cursor-pointer')}>
        <img src={logo.src} alt='Logo' className={clsx('w-full h-full')} />
      </div>
      <ul
        className={clsx(
          'fixed md:static bottom-0 left-0 right-0',
          'flex items-center py-5 px-3 overflow-x-auto scrollbar-none',
          'bg-dk-body md:bg-transparent'
        )}>
        <li
          className={clsx(
            'mr-6',
            'text-white flex-shrink-0',
            'transition-all duration-300',
            'cursor-pointer',
            'lg:hover:text-primary-v4-hv'
          )}>
          Home
        </li>
        <li
          className={clsx(
            'mr-6',
            'text-white flex-shrink-0',
            'transition-all duration-300',
            'cursor-pointer',
            'lg:hover:text-primary-v4-hv'
          )}>
          TV Shows
        </li>
        <li
          className={clsx(
            'mr-6',
            'text-white flex-shrink-0',
            'transition-all duration-300',
            'cursor-pointer',
            'lg:hover:text-primary-v4-hv'
          )}>
          Movies
        </li>
        <li
          className={clsx(
            'mr-6',
            'text-white flex-shrink-0',
            'transition-all duration-300',
            'cursor-pointer',
            'lg:hover:text-primary-v4-hv'
          )}>
          New & Popular
        </li>
        <li
          className={clsx(
            'text-white flex-shrink-0',
            'transition-all duration-300',
            'cursor-pointer',
            'lg:hover:text-primary-v4-hv'
          )}>
          My List
        </li>
      </ul>
    </div>
  );
}

export default HeaderLeft;
