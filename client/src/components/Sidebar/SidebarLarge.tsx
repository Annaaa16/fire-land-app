// clsx
import clsx from 'clsx';

import { LOCAL_STORAGE } from '@/constants';
import { useGlobalContext } from '@/contexts/GlobalContext';

import User from '../User';

interface SidebarLargeProps {
  menu: Array<{ title: string; active: boolean; icon: any }>;
}

function SidebarLarge({ menu }: SidebarLargeProps) {
  const { theme } = useGlobalContext();

  return (
    <aside
      className={clsx(
        'fixed top-[64px] left-0 z-50',
        'flex flex-col items-center w-[300px] h-[calc(100vh-64px)] py-6 shadow-2xl',
        'bg-white dark:bg-dk-cpn'
      )}>
      <User user rounded className={clsx('w-14 h-14')} />

      <ul className={clsx('mt-10 w-full px-4 text-center')}>
        {menu.map(({ title, active, icon: Icon }) => (
          <li
            key={title}
            className={clsx(
              'group py-3 px-4 rounded-xl mb-5',
              theme === LOCAL_STORAGE.DARK_THEME_VALUE && active
                ? 'shadow-primary-v4'
                : active && 'shadow-primary-v2',
              active && 'bg-primary-v2 dark:bg-primary-v4',
              'transition-all duration-200',
              'cursor-pointer',
              !active &&
                'hover:shadow-lg dark:hover:shadow-3xl hover:bg-white dark:hover:bg-dk-tooltip'
            )}>
            <div className={clsx('flex items-center')}>
              <Icon
                className={clsx(
                  '!text-2xl',
                  active ? 'text-white' : 'text-gray-lt dark:text-gray-dk',
                  !active &&
                    'group-hover:text-primary-v2 dark:group-hover:text-primary-v4'
                )}
              />
              <span
                className={clsx(
                  'ml-3 font-semibold',
                  active ? 'text-white' : 'dark:text-white',
                  'transition-all duration-250 ease-out',
                  !active && 'group-hover:translate-x-1'
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
