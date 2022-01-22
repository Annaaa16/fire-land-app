import { useRef } from 'react';

// clsx
import clsx from 'clsx';

// types
import { SidebarSmallProps } from './SidebarSmall';

import { useUsersSelector } from '@/redux/selectors';
import useClickOutside from '@/hooks/useClickOutside';
import useUsers from '@/hooks/useUsers';

import Avatar from '../Avatar';

interface SidebarLargeProps extends SidebarSmallProps {}

function SidebarLarge(props: SidebarLargeProps) {
  const { menu, onNavigate, onCloseMenu } = props;

  const { currentUser } = useUsersSelector();

  const sidebarRef = useRef<HTMLElement>(null);

  const { visitWall } = useUsers();
  useClickOutside(sidebarRef, onCloseMenu);

  return (
    <aside
      ref={sidebarRef}
      className={clsx(
        'sidebar fixed left-0 z-50',
        'flex flex-col items-center w-2/3 md:w-75 py-6 shadow-2xl',
        'bg-white dark:bg-dk-cpn'
      )}>
      <Avatar
        user
        rounded
        className={clsx('w-14 h-14')}
        avatar={currentUser.avatar}
        onClick={() => visitWall(currentUser._id)}
      />

      <ul className={clsx('mt-10 w-full px-3 md:px-4 text-center')}>
        {menu.map(({ title, active, icon: Icon, maintain, path }, idx) => (
          <li
            onClick={() => onNavigate(maintain, path)}
            key={title + idx}
            className={clsx(
              'group py-3 px-4 rounded-xl mb-5',
              'transition-all duration-200',
              'cursor-pointer',
              active && ['shadow-lg', 'dark:bg-dk-tooltip']
            )}>
            <div className={clsx('flex items-center')}>
              <Icon
                className={clsx(
                  '!text-xl md:!text-2xl',
                  active
                    ? 'text-primary-v2 dark:text-primary-v4'
                    : [
                        'text-gray-lt dark:text-gray-dk',
                        'group-hover:text-primary-v2 dark:group-hover:text-primary-v4',
                      ]
                )}
              />
              <span
                className={clsx(
                  'ml-3 text-sm-1 md:text-sm font-semibold',
                  'transition-all duration-250 ease-out',
                  active
                    ? 'text-primary-v2 dark:text-primary-v4'
                    : [
                        'text-gray-lt dark:text-gray-dk',
                        'group-hover:text-primary-v2 dark:group-hover:text-primary-v4',
                      ]
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
