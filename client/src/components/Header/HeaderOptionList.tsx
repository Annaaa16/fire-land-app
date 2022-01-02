import { useState, useRef } from 'react';
import { useRouter } from 'next/router';

// clsx
import clsx from 'clsx';

// material ui icons
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import WidgetsIcon from '@mui/icons-material/Widgets';

// next themes
import { useTheme } from 'next-themes';

// types
import { AxiosResponse } from 'axios';
import { StatusResponse } from '@/models/common';

import { LOCAL_STORAGE, PATHS } from '@/constants';
import { useGlobalContext } from '@/contexts/GlobalContext';
import { authApiClient } from '@/apis/authApi';
import { useUsersSelector } from '@/redux/selectors';
import useUsers from '@/hooks/useUsers';
import useClickOutside from '@/hooks/useClickOutside';

import HeaderOption from './HeaderOption';

function HeaderOptionList() {
  const { notifyMaintain } = useGlobalContext();
  const { currentUser } = useUsersSelector();

  const [isOpenSetting, setIsOpenSetting] = useState<boolean>(false);

  const optionsRef = useRef<HTMLDivElement>(null);

  const { visitWall } = useUsers();
  const router = useRouter();

  const { theme, setTheme } = useTheme();

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

  const handleOpenSettings = () => {
    notifyMaintain();
    setIsOpenSetting(false);
  };

  const handleOpenProfile = () => {
    visitWall(currentUser._id);
    setIsOpenSetting(false);
  };

  useClickOutside(optionsRef, () => setIsOpenSetting(false));

  return (
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
        <HeaderOption
          onClick={handleOpenSettings}
          icon={SettingsIcon}
          text='Settings'
          className='border-b border-primary-v1-txt'
        />
        <HeaderOption
          onClick={handleOpenProfile}
          icon={AssignmentIndIcon}
          text='Profile'
          className='border-b border-primary-v1-txt'
        />
        <HeaderOption
          onClick={handleToggleTheme}
          icon={
            theme === LOCAL_STORAGE.LIGHT_THEME_VALUE
              ? Brightness4Icon
              : Brightness7Icon
          }
          text={
            theme === LOCAL_STORAGE.LIGHT_THEME_VALUE
              ? 'Night mode'
              : 'Light mode'
          }
          className='border-b border-primary-v1-txt'
        />
        <HeaderOption
          onClick={handleLogout}
          icon={ExitToAppIcon}
          text='Log Out'
        />
      </ul>
    </div>
  );
}

export default HeaderOptionList;
