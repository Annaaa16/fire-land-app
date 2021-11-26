// clsx
import clsx from 'clsx';

import sidebarTooltips from '@/utils/sidebarTooltips';

import User from '../User';
import Tooltip from '../Tooltip';

import icon from '@/assets/svgs/icon.svg';

interface SidebarSmallProps {
  messenger?: boolean;
}

function SidebarSmall({ messenger }: SidebarSmallProps) {
  const isDark = true;

  return (
    <aside
      className={clsx(
        messenger ? 'z-50' : 'fixed left-0 top-16 z-50',
        'hidden lg:block w-20 py-6',
        messenger ? 'border-r border-lt-line dark:border-dk-line' : 'shadow-xl',
        messenger ? 'h-screen' : 'h-[calc(100vh-64px)]',
        'bg-white dark:bg-dk-cpn'
      )}>
      {messenger && (
        <div
          className={clsx(
            'w-12 pb-5 mx-auto mb-6 border-b border-lt-line dark:border-dk-line',
            'cursor-pointer'
          )}>
          <img src={icon.src} alt='Logo' className={clsx('w-full')} />
        </div>
      )}
      <User view='sm' className='mx-auto' rounded />

      <ul className={clsx('mt-8 w-full px-4 text-center')}>
        {sidebarTooltips.map(({ title, isActive, icon: Icon }) => (
          <li
            key={title}
            className={clsx(
              'relative',
              'group py-3 rounded-xl mb-5',
              isActive && 'bg-primary-v2 dark:bg-primary-v4',
              isDark && isActive
                ? 'shadow-primary-v4'
                : isActive && 'shadow-primary-v2',
              'cursor-pointer',
              'transition-all duration-200',
              !isActive &&
                'hover:shadow-lg dark:hover:shadow-3xl hover:bg-white dark:hover:bg-dk-tooltip'
            )}>
            <Icon
              className={clsx(
                '!text-2xl',
                isActive ? 'text-white' : 'text-gray-lt dark:text-gray-dk',
                !isActive &&
                  'group-hover:text-primary-v2 dark:group-hover:text-primary-v4'
              )}
            />
            <Tooltip title={title} direction='rtl' />
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default SidebarSmall;
