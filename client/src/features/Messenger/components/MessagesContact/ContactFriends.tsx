// clsx
import clsx from 'clsx';

import User from '@/components/User';

function ContactFriends() {
  return (
    <ul className='mt-7'>
      <li
        className={clsx(
          'flex items-center border-l-[3px] border-primary-v1 px-8 py-5',
          'bg-gray-100 dark:bg-dk-tooltip-hv',
          'cursor-pointer'
        )}>
        <User view='small' subClass='flex-shrink-0' />
        <div className={clsx('ml-3 max-w-[60%]')}>
          <span className={clsx('font-bold', 'dark:text-white')}>IG Dev</span>
          <p
            className={clsx(
              'font-bold text-xs mt-1 truncate',
              'text-primary-v1 dark:text-primary-v4'
            )}>
            Hi I am Josephin, can you help me to find best chat app?.
          </p>
        </div>
        <div className={clsx('ml-auto')}>
          <span className={clsx('text-xs', 'dark:text-white')}>10 min</span>
        </div>
      </li>
      <li
        className={clsx(
          'flex items-center border-primary-v1 px-8 py-5',
          'dark:bg-dk-cpn',
          'cursor-pointer'
        )}>
        <User view='small' subClass='flex-shrink-0' />
        <div className={clsx('ml-3 max-w-[60%]')}>
          <span className={clsx('font-bold', 'dark:text-white')}>IG Dev</span>
          <p
            className={clsx(
              'font-bold text-xs mt-1 truncate',
              'text-primary-v1 dark:text-primary-v4'
            )}>
            Hi I am Josephin, can you help me to find best chat app?.
          </p>
        </div>
        <div className={clsx('ml-auto')}>
          <span className={clsx('text-xs', 'dark:text-white')}>10 min</span>
        </div>
      </li>
    </ul>
  );
}

export default ContactFriends;
