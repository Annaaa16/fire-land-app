import { useState } from 'react';

// clsx
import clsx from 'clsx';

// material ui icons
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function HeaderOptions() {
  const [isSetting, setIsSetting] = useState(true);

  return (
    <div
      className={clsx(
        'fixed md:static left-0 bottom-0 z-50',
        'flex items-center justify-center w-full md:w-auto',
        'bg-primary-v1 md:bg-transparent'
      )}>
      <div
        className={clsx(
          'i-flex-center lg:px-4 lg:mx-4 md:border-l md:border-r border-primary-v1-text'
        )}>
        <div className={clsx('px-2 lg:px-0 py-4 md:py-0')}>
          <ShoppingBagOutlinedIcon
            className={clsx(
              '!text-2xl !w-11',
              'text-primary-v1-text',
              '!transition-all !duration-250',
              'cursor-pointer',
              'hover:text-white'
            )}
          />
        </div>
        <div className={clsx('px-2 lg:px-0 py-4 md:py-0')}>
          <SentimentSatisfiedOutlinedIcon
            className={clsx(
              '!text-2xl !w-11',
              'text-primary-v1-text',
              '!transition-all !duration-250',
              'cursor-pointer',
              'hover:text-white'
            )}
          />
        </div>
        <div className={clsx('px-2 lg:px-0 py-4 md:py-0')}>
          <SmsOutlinedIcon
            className={clsx(
              '!text-2xl !w-11',
              'text-primary-v1-text',
              '!transition-all !duration-250',
              'cursor-pointer',
              'hover:text-white'
            )}
          />
        </div>
        <div className={clsx('relative', 'px-2 lg:px-0 py-4 md:py-0')}>
          <NotificationsNoneOutlinedIcon
            className={clsx(
              '!text-2xl !w-11',
              'text-white',
              '!transition-all !duration-250',
              'cursor-pointer',
              'hover:text-white'
            )}
          />

          <div
            className={clsx(
              'absolute -top-px md:-top-5 right-3 lg:right-1.5',
              'text-4xl',
              'text-primary-v2'
            )}>
            .
          </div>
        </div>
      </div>

      <div
        className={clsx(
          'relative',
          'px-2 md:pr-0 md:ml-2 lg:ml-0 lg:px-0 py-4 md:py-0'
        )}>
        <SettingsOutlinedIcon
          className={clsx('!text-2xl !w-10', 'text-white', 'cursor-pointer')}
          onClick={() => setIsSetting(!isSetting)}
        />

        <ul
          className={clsx(
            'absolute bottom-[90%] md:top-[150%] right-0',
            'px-4 py-1.5 min-w-max rounded-lg lg:shadow-primary-v1 min-h-[max-content]',
            isSetting ? 'block' : 'hidden',
            'bg-primary-v1 dark:bg-primary-v3'
          )}>
          <li
            className={clsx(
              'group flex items-center pl-1 pr-3 py-3 border-b border-primary-v1-text',
              'cursor-pointer',
              'transition-all ease-out'
            )}>
            <SettingsIcon
              className={clsx(
                'text-white',
                '!transition-all !ease-out',
                'group-hover:text-primary-v2 dark:group-hover:text-primary-v4'
              )}
            />
            <span
              className={clsx(
                'ml-1.5 font-bold text-xs md:text-sm',
                'text-white',
                'transition-all ease-out',
                'group-hover:text-primary-v2 dark:group-hover:text-primary-v4'
              )}>
              Settings & Privacy
            </span>
          </li>
          <li
            className={clsx(
              'group flex items-center pl-1 pr-3 py-3 border-b border-primary-v1-text',
              'cursor-pointer',
              'transition-all ease-out'
            )}>
            <HelpOutlinedIcon
              className={clsx(
                'text-white',
                '!transition-all !ease-out',
                'group-hover:text-primary-v2 dark:group-hover:text-primary-v4'
              )}
            />
            <span
              className={clsx(
                'ml-1.5 font-bold text-xs md:text-sm',
                'text-white',
                'transition-all ease-out',
                'group-hover:text-primary-v2 dark:group-hover:text-primary-v4'
              )}>
              Help & Support
            </span>
          </li>
          <li
            className={clsx(
              'group flex items-center pl-1 pr-3 py-3 border-b border-primary-v1-text',
              'cursor-pointer',
              'transition-all ease-out'
            )}>
            <Brightness4Icon
              className={clsx(
                'text-white',
                '!transition-all !ease-out',
                'group-hover:text-primary-v2 dark:group-hover:text-primary-v4'
              )}
            />
            <span
              className={clsx(
                'ml-1.5 font-bold text-xs md:text-sm',
                'text-white',
                'transition-all ease-out',
                'group-hover:text-primary-v2 dark:group-hover:text-primary-v4'
              )}>
              Night mode
            </span>
          </li>
          <li
            className={clsx(
              'group flex items-center pl-1 pr-3 py-3',
              'cursor-pointer',
              'transition-all ease-out'
            )}>
            <ExitToAppIcon
              className={clsx(
                'text-white',
                '!transition-all !ease-out',
                'group-hover:text-primary-v2 dark:group-hover:text-primary-v4'
              )}
            />
            <span
              className={clsx(
                'ml-1.5 font-bold text-xs md:text-sm',
                'text-white',
                'transition-all ease-out',
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
