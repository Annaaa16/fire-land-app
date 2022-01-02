import { useState, useRef } from 'react';

// clsx
import clsx from 'clsx';

// material ui icons
import ForumIcon from '@mui/icons-material/Forum';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AddBoxIcon from '@mui/icons-material/AddBox';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import CircleIcon from '@mui/icons-material/Circle';

// types
import { MouseEvent } from 'react';

import { useNotificationsSelector } from '@/redux/selectors';
import { notificationActions } from '@/redux/slices/notificationsSlice';
import useClickOutside from '@/hooks/useClickOutside';
import useStoreDispatch from '@/hooks/useStoreDispatch';

import Tooltip from '../Tooltip';
import HeaderNotifications from './HeaderNotifications';
import HeaderOptionList from './HeaderOptionList';

function HeaderOptions() {
  const { notifications } = useNotificationsSelector();

  const [isOpenNotifications, setIsOpenNotifications] =
    useState<boolean>(false);

  const optionsRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const dispatch = useStoreDispatch();

  const hasNotifications = notifications.length > 0;

  const handleOpenNotifications = () => {
    setIsOpenNotifications(!isOpenNotifications);
    isOpenNotifications && dispatch(notificationActions.clearNotifications());
  };

  useClickOutside(notificationsRef, (e: MouseEvent<SVGSVGElement>) => {
    const isButtonClicked = (e.target as HTMLElement).closest(
      '[data-notifications-button]'
    );

    if (!isButtonClicked) handleOpenNotifications();
  });

  return (
    <div
      className={clsx(
        'fixed md:static left-0 bottom-0 z-50',
        'flex items-center justify-center w-full h-14 md:h-auto md:w-auto md:ml-auto',
        'bg-primary-v1 dark:bg-primary-v3 md:bg-transparent'
      )}>
      <div className={clsx('flex-center space-x-1')}>
        <div className={clsx('relative', 'group px-2 lg:px-0 py-4 md:py-0')}>
          <PeopleAltIcon
            className={clsx(
              '!text-2xl !w-11',
              'text-primary-v1-txt',
              'cursor-pointer',
              'lg:hover:text-white'
            )}
          />

          <Tooltip
            title='0 Friend Requests'
            className='top-full'
            direction='btt'
          />
        </div>
        <div className={clsx('relative', 'group px-2 lg:px-0 py-4 md:py-0')}>
          <ForumIcon
            className={clsx(
              '!text-2xl !w-11',
              'text-primary-v1-txt',
              'cursor-pointer',
              'lg:hover:text-white'
            )}
          />

          <Tooltip title='0 Message' className='top-full' direction='btt' />
        </div>
        <div className={clsx('relative', 'group px-2 lg:px-0 py-4 md:py-0')}>
          <NotificationsIcon
            onClick={handleOpenNotifications}
            data-notifications-button
            className={clsx(
              '!text-2xl !w-11',
              hasNotifications || isOpenNotifications
                ? 'text-white'
                : 'text-primary-v1-txt',
              'cursor-pointer',
              'lg:hover:text-white'
            )}
          />

          {hasNotifications && (
            <div
              className={clsx(
                'absolute right-4 lg:right-2 top-3 md:-top-1',
                'flex-center'
              )}>
              <CircleIcon
                className={clsx('relative', '!text-[8px]', 'text-red-400')}
              />
              <div
                className={clsx(
                  'absolute inset-0',
                  'rounded-full',
                  'bg-red-200',
                  'animate-ping'
                )}
              />
            </div>
          )}

          {isOpenNotifications ? (
            <HeaderNotifications ref={notificationsRef} />
          ) : (
            <Tooltip
              title={notifications.length + ' Notifications'}
              className='top-full'
              direction='btt'
            />
          )}
        </div>
      </div>
      <div
        className={clsx(
          'hidden lg:flex-center lg:px-4 lg:mx-4 md:border-l md:border-r space-x-1 border-primary-v1-txt'
        )}>
        <div className={clsx('relative', 'group px-2 lg:px-0 py-4 md:py-0')}>
          <AddBoxIcon
            className={clsx('!text-2xl !w-11', 'text-white', 'cursor-pointer')}
          />

          <Tooltip
            title='Create new post'
            className='top-full'
            direction='btt'
          />
        </div>
        <div className={clsx('relative', 'group px-2 lg:px-0 py-4 md:py-0')}>
          <StoreMallDirectoryIcon
            className={clsx('!text-2xl !w-11', 'text-white', 'cursor-pointer')}
          />

          <Tooltip title='Marketplace' className='top-full' direction='btt' />
        </div>
      </div>

      <HeaderOptionList />
    </div>
  );
}

export default HeaderOptions;
