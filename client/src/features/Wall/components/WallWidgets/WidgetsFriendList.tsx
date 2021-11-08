import Link from 'next/link';

// clsx
import clsx from 'clsx';

import User from '@/components/User';

function WidgetsFriendList() {
  return (
    <div
      className={clsx(
        'p-4 rounded-lg shadow-md dark:shadow-xl mt-5',
        'bg-white dark:bg-dk-cpn'
      )}>
      <div className={clsx('flex items-center justify-between')}>
        <h2 className={clsx('text-base font-bold', 'dark:text-white')}>
          Friends
        </h2>
        <Link href='#'>
          <a
            className={clsx(
              'text-sm-1',
              'text-primary-v1 dark:text-primary-v4',
              'transition-all duration-300 ease-out',
              'hover:text-primary-v1-hv dark:hover:text-primary-v4-hv'
            )}>
            See All Friends
          </a>
        </Link>
      </div>
      <div className={clsx('mt-3', 'dark:text-white')}>246 friends</div>
      <ul className={clsx('flex flex-wrap mt-2')}>
        <li className={clsx('w-1/5 mt-3')}>
          <User subClass='mx-auto' />
          <div className={clsx('text-center text-xs mt-1', 'dark:text-white')}>
            IG Dev
          </div>
        </li>
        <li className={clsx('w-1/5 mt-3')}>
          <User subClass='mx-auto' />
          <div className={clsx('text-center text-xs mt-1', 'dark:text-white')}>
            IG Dev
          </div>
        </li>
      </ul>
    </div>
  );
}

export default WidgetsFriendList;
