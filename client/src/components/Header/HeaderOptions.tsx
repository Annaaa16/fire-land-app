import { useState, useRef } from 'react';
import { useRouter } from 'next/router';

// clsx
import clsx from 'clsx';

// material ui icons
import ForumIcon from '@mui/icons-material/Forum';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import WidgetsIcon from '@mui/icons-material/Widgets';
import AddBoxIcon from '@mui/icons-material/AddBox';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import CircleIcon from '@mui/icons-material/Circle';

// types
import { AxiosResponse } from 'axios';
import { StatusResponse } from '@/models/common';
import { MouseEvent } from 'react';

import { LOCAL_STORAGE, PATHS } from '@/constants';
import { useGlobalContext } from '@/contexts/GlobalContext';
import { authApiClient } from '@/apis/authApi';
import { useNotificationsSelector } from '@/redux/selectors';
import { notificationActions } from '@/redux/slices/notificationsSlice';
import useClickOutside from '@/hooks/useClickOutside';
import useStoreDispatch from '@/hooks/useStoreDispatch';

import Tooltip from '../Tooltip';
import HeaderNotifications from './HeaderNotifications';

function HeaderOptions() {
  const { theme, setTheme } = useGlobalContext();
  const { notifications } = useNotificationsSelector();

  const [isOpenSetting, setIsOpenSetting] = useState<boolean>(false);
  const [isOpenNotifications, setIsOpenNotifications] =
    useState<boolean>(false);

  const optionsRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const dispatch = useStoreDispatch();

  const hasNotifications = notifications.length > 0;

  const handleLogout = async () => {
    const { logoutUser } = authApiClient();

    const response = (await logoutUser()) as AxiosResponse<StatusResponse>;

    if (response.data.success) {
      router.push(PATHS.LOGIN);
    }
  };

  const handleToggleTheme = () => {
    setTheme(
      theme === LOCAL_STORAGE.LIGHT_THEME_VALUE
        ? LOCAL_STORAGE.DARK_THEME_VALUE
        : LOCAL_STORAGE.LIGHT_THEME_VALUE
    );
  };

  const handleOpenNotifications = () => {
    setIsOpenNotifications(!isOpenNotifications);
    isOpenNotifications && dispatch(notificationActions.clearNotifications());
  };

  useClickOutside(optionsRef, () => setIsOpenSetting(false));

  useClickOutside(notificationsRef, (e: MouseEvent<SVGSVGElement>) => {
    const isMatchButton = (e.target as HTMLElement).closest(
      '[data-notifications-button]'
    );

    if (!isMatchButton) handleOpenNotifications();
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
              hasNotifications ? 'text-white' : 'text-primary-v1-txt',
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

      <div
        ref={optionsRef}
        className={clsx(
          'relative',
          'px-2 md:pr-0 md:ml-2 lg:ml-0 lg:px-0 py-4 md:py-0'
        )}>
        <WidgetsIcon
          className={clsx('!text-2xl !w-10', 'text-white', 'cursor-pointer')}
          onClick={() => setIsOpenSetting(!isOpenSetting)}
        />

        <ul
          className={clsx(
            'absolute bottom-[90%] md:top-[150%] right-1/2 lg:right-0',
            'px-4 py-1.5 w-44 translate-x-1/2 lg:translate-x-0 rounded-lg lg:shadow-primary-v1 min-h-[max-content]',
            isOpenSetting ? 'block' : 'hidden',
            'bg-primary-v1 dark:bg-primary-v3'
          )}>
          <li
            className={clsx(
              'group flex items-center pl-1 pr-3 py-3 border-b border-primary-v1-txt',
              'cursor-pointer',
              'transition-all ease-out'
            )}>
            <SettingsIcon
              className={clsx(
                'text-white',
                'group-hover:text-primary-v2 dark:group-hover:text-primary-v4'
              )}
            />
            <span
              className={clsx(
                'ml-1.5 font-semibold text-xs md:text-sm',
                'text-white',
                'transition-all ease-out',
                'select-none',
                'group-hover:text-primary-v2 dark:group-hover:text-primary-v4'
              )}>
              Settings
            </span>
          </li>
          <li
            className={clsx(
              'group flex items-center pl-1 pr-3 py-3 border-b border-primary-v1-txt',
              'cursor-pointer',
              'transition-all ease-out'
            )}>
            <AssignmentIndIcon
              className={clsx(
                'text-white',
                'group-hover:text-primary-v2 dark:group-hover:text-primary-v4'
              )}
            />
            <span
              className={clsx(
                'ml-1.5 font-semibold text-xs md:text-sm',
                'text-white',
                'transition-all ease-out',
                'select-none',
                'group-hover:text-primary-v2 dark:group-hover:text-primary-v4'
              )}>
              Profile
            </span>
          </li>
          <li
            onClick={handleToggleTheme}
            className={clsx(
              'group flex items-center pl-1 pr-3 py-3 border-b border-primary-v1-txt',
              'cursor-pointer',
              'transition-all ease-out'
            )}>
            {theme === LOCAL_STORAGE.LIGHT_THEME_VALUE ? (
              <Brightness4Icon
                className={clsx(
                  'text-white',
                  'group-hover:text-primary-v2 dark:group-hover:text-primary-v4'
                )}
              />
            ) : (
              <Brightness7Icon
                className={clsx(
                  'text-white',
                  'group-hover:text-primary-v2 dark:group-hover:text-primary-v4'
                )}
              />
            )}
            <span
              className={clsx(
                'ml-1.5 font-semibold text-xs md:text-sm',
                'text-white',
                'transition-all ease-out',
                'select-none',
                'group-hover:text-primary-v2 dark:group-hover:text-primary-v4'
              )}>
              {theme === LOCAL_STORAGE.LIGHT_THEME_VALUE
                ? 'Night mode'
                : 'Light mode'}
            </span>
          </li>
          <li
            onClick={handleLogout}
            className={clsx(
              'group flex items-center pl-1 pr-3 py-3',
              'cursor-pointer',
              'transition-all ease-out'
            )}>
            <ExitToAppIcon
              className={clsx(
                'text-white',
                'group-hover:text-primary-v2 dark:group-hover:text-primary-v4'
              )}
            />
            <span
              className={clsx(
                'ml-1.5 font-semibold text-xs md:text-sm',
                'text-white',
                'transition-all ease-out',
                'select-none',
                'group-hover:text-primary-v2 dark:group-hover:text-primary-v4'
              )}>
              Log Out
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HeaderOptions;
