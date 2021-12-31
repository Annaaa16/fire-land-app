import { useRef } from 'react';
import { useRouter } from 'next/router';

// clsx
import clsx from 'clsx';

// types
import { MouseEvent } from 'react';

import { PATHS } from '@/constants';
import { useUsersSelector } from '@/redux/selectors';
import useClickOutside from '@/hooks/useClickOutside';
import useUsers from '@/hooks/useUsers';

import User from '../User';
import Tooltip from '../Tooltip';

// svgs
import icon from '@/assets/svgs/icon.svg';

export interface SidebarSmallProps {
  menu: Array<{
    title: string;
    active: boolean;
    icon: any;
    maintain: boolean;
    path: string;
  }>;
  messenger?: boolean;
  onNavigate: (maintain: boolean, path: string) => void;
  onCloseMenu: (e: MouseEvent<HTMLElement>) => void;
}

function SidebarSmall(props: SidebarSmallProps) {
  const { menu, messenger, onNavigate, onCloseMenu } = props;

  const { currentUser } = useUsersSelector();

  const router = useRouter();
  const sidebarRef = useRef<HTMLElement>(null);

  const { visitWall } = useUsers();
  useClickOutside(sidebarRef, onCloseMenu);

  return (
    <aside
      className={clsx(
        'hidden lg:block w-20 py-6',
        'bg-white dark:bg-dk-cpn',
        messenger
          ? ['z-50', 'h-screen', 'border-r border-lt-line dark:border-dk-line']
          : ['sidebar fixed left-0 z-50', 'shadow-xl']
      )}>
      {messenger && (
        <div
          onClick={() => router.push(PATHS.NEWSFEED)}
          className={clsx(
            'w-12 pb-5 mx-auto mb-6 border-b border-lt-line dark:border-dk-line',
            'cursor-pointer'
          )}>
          <img src={icon.src} alt='Logo' className={clsx('img-full')} />
        </div>
      )}
      <User
        view='sm'
        className='mx-auto'
        rounded
        avatar={currentUser.avatar}
        onClick={() => visitWall(currentUser._id)}
      />

      <ul
        className={clsx(
          'flex flex-col items-center space-y-4 mt-8 w-full text-center'
        )}>
        {menu.map(({ title, active, icon: Icon, maintain, path }, idx) => (
          <li
            onClick={() => onNavigate(maintain, path)}
            key={title + idx}
            className={clsx(
              'relative',
              'group flex-center w-13 h-13 rounded-xl',
              active && ['shadow-lg', 'dark:bg-dk-tooltip'],
              'cursor-pointer'
            )}>
            <Icon
              className={clsx(
                '!text-2xl',
                active
                  ? 'text-primary-v2 dark:text-primary-v4'
                  : 'text-gray-lt dark:text-gray-dk',
                'group-hover:scale-105',
                !active &&
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
