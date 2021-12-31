import { useRouter } from 'next/router';

// clsx
import clsx from 'clsx';

// material ui icons
import GroupIcon from '@mui/icons-material/Group';
import ChatIcon from '@mui/icons-material/Chat';
import Tooltip from '@/components/Tooltip';

import { PATHS } from '@/constants';
import { useUsersSelector } from '@/redux/selectors';

function NewsFeedMembers() {
  const { onlineUsers } = useUsersSelector();

  const router = useRouter();

  return (
    <div
      className={clsx(
        'flex-between mt-7 p-4 shadow-md rounded-xl',
        'bg-white dark:bg-dk-cpn'
      )}>
      <div className={clsx('flex items-center')}>
        <div
          className={clsx(
            'flex-center w-9 h-9 md:w-11 md:h-11 mr-3 rounded-full',
            'bg-indigo-50 dark:bg-primary-v4'
          )}>
          <GroupIcon className={clsx('text-primary-v1 dark:text-white')} />
        </div>
        <span
          className={clsx(
            'text-xs md:text-sm',
            'text-gray-dk dark:text-dk-text'
          )}>
          Online members:
        </span>
        <span
          className={clsx(
            'ml-1 font-semibold text-xs md:text-sm',
            'dark:text-primary-v4'
          )}>
          {onlineUsers.length < 10
            ? '0' + onlineUsers.length
            : onlineUsers.length}
        </span>
      </div>

      <div
        onClick={() => router.push(PATHS.MESSENGER)}
        className={clsx(
          'relative',
          'flex-center group w-9 h-9 md:w-11 md:h-11 mr-2 rounded-full',
          'bg-indigo-50 dark:bg-primary-v4',
          'cursor-pointer'
        )}>
        <ChatIcon
          className={clsx('!text-xl', 'text-primary-v1 dark:text-white')}
        />
        <Tooltip title='Go to chat room!' direction='ttb' />
      </div>
    </div>
  );
}

export default NewsFeedMembers;
