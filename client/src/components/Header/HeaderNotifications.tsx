import { forwardRef, useEffect } from 'react';

// clsx
import clsx from 'clsx';

// react timeago
import Timeago from 'react-timeago';

// material ui icons
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';

import { useNotificationsSelector } from '@/redux/selectors';

import { Scrollbar } from '../Scrollbar';
import User from '../User';

interface HeaderNotificationsProps {}

const HeaderNotifications = forwardRef<
  HTMLDivElement,
  HeaderNotificationsProps
>((_, forwardRef) => {
  const { notifications } = useNotificationsSelector();

  return (
    <div
      ref={forwardRef}
      className={clsx(
        'absolute bottom-full md:bottom-[unset] md:top-[calc(100%+15px)] left-1/2',
        '-translate-x-1/2 shadow-box w-87 py-2 rounded-lg',
        'bg-white dark:bg-dk-cpn'
      )}>
      {notifications.length === 0 ? (
        <div className={clsx('flex items-center p-4')}>
          <CampaignOutlinedIcon
            className={clsx('mr-2 !text-4xl', 'text-gray-lt dark:text-gray-dk')}
          />
          <p
            className={clsx('font-semibold', 'text-gray-lt dark:text-gray-dk')}>
            Empty notification
          </p>
        </div>
      ) : (
        <Scrollbar className='px-2 max-h-90'>
          <div>
            {notifications.map(({ user, content, createdAt }, idx) => (
              <div
                key={'notification' + idx}
                className={clsx(
                  'flex max-w-full rounded-lg px-2 py-2.5',
                  'lg:hover:bg-gray-100 lg:dark:hover:bg-dk-tooltip',
                  'cursor-pointer'
                )}>
                <User
                  className={clsx('w-9 h-9 mr-2')}
                  rounded
                  avatar={user.avatar}
                />
                <div>
                  <p
                    className={clsx(
                      'mb-1 text-sm-1 line-clamp-3',
                      'dark:text-white'
                    )}>
                    {content}
                  </p>
                  <Timeago
                    live={false}
                    date={createdAt}
                    className={clsx(
                      'text-xs',
                      'cursor-pointer',
                      'dark:text-gray'
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </Scrollbar>
      )}
    </div>
  );
});

export default HeaderNotifications;
