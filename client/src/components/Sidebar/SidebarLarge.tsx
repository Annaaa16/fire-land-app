// clsx
import clsx from 'clsx';

import sidebarTooltips from '@/utils/sidebarTooltips';

import User from '../User';

function SidebarLarge() {
  const isDark = true;

  return (
    <aside
      className={clsx(
        'fixed top-[64px] left-0 z-50',
        'flex flex-col items-center w-[300px] h-[calc(100vh-64px)] py-6 shadow-2xl',
        'bg-white dark:bg-dk-cpn'
      )}>
      <User user rounded className={clsx('w-14 h-14')} />

      <ul className={clsx('mt-10 w-full px-4 text-center')}>
        {sidebarTooltips.map(({ title, isActive, icon: Icon }) => (
          <li
            key={title}
            className={clsx(
              'group py-3 px-4 rounded-xl mb-5',
              isDark && isActive
                ? 'shadow-primary-v4'
                : isActive && 'shadow-primary-v2',
              isActive && 'bg-primary-v2 dark:bg-primary-v4',
              'transition-all duration-200',
              'cursor-pointer',
              !isActive &&
                'hover:shadow-lg dark:hover:shadow-3xl hover:bg-white dark:hover:bg-dk-tooltip'
            )}>
            <div className={clsx('flex items-center')}>
              <Icon
                className={clsx(
                  '!text-2xl',
                  isActive ? 'text-white' : 'text-gray-lt dark:text-gray-dk',
                  !isActive &&
                    'group-hover:text-primary-v2 dark:group-hover:text-primary-v4'
                )}
              />
              <span
                className={clsx(
                  'ml-3 font-semibold',
                  isActive ? 'text-white' : 'dark:text-white',
                  'transition-all duration-250 ease-out',
                  !isActive && 'group-hover:translate-x-1'
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
