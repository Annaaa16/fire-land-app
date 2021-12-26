// clsx
import clsx from 'clsx';

// types
import { SidebarSmallProps } from './SidebarSmall';

import User from '../User';

interface SidebarLargeProps extends SidebarSmallProps {}

function SidebarLarge({ menu, handleNavigate }: SidebarLargeProps) {
  return (
    <aside
      className={clsx(
        'fixed top-[64px] left-0 z-50',
        'flex flex-col items-center w-[300px] h-[calc(100vh-64px)] py-6 shadow-2xl',
        'bg-white dark:bg-dk-cpn'
      )}>
      <User user rounded className={clsx('w-14 h-14')} />

      <ul className={clsx('mt-10 w-full px-4 text-center')}>
        {menu.map(({ title, active, icon: Icon, maintain, path }, idx) => (
          <li
            onClick={() => handleNavigate(maintain, path)}
            key={title + idx}
            className={clsx(
              'group py-3 px-4 rounded-xl mb-5',
              active && ['shadow-lg', 'dark:bg-dk-tooltip'],
              'transition-all duration-200',
              'cursor-pointer'
            )}>
            <div className={clsx('flex items-center')}>
              <Icon
                className={clsx(
                  '!text-2xl',
                  active
                    ? 'text-primary-v2 dark:text-primary-v4'
                    : 'text-gray-lt dark:text-gray-dk',
                  !active &&
                    'group-hover:text-primary-v2 dark:group-hover:text-primary-v4'
                )}
              />
              <span
                className={clsx(
                  'ml-3 font-semibold',
                  active
                    ? 'text-primary-v2 dark:text-primary-v4'
                    : 'text-gray-lt dark:text-gray-dk',
                  'transition-all duration-250 ease-out',
                  !active &&
                    'group-hover:text-primary-v2 dark:group-hover:text-primary-v4'
                )}>
                {title}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default SidebarLarge;
