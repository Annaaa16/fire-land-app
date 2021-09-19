// clsx
import clsx from 'clsx';

// material ui icons
import PhoneIcon from '@mui/icons-material/Phone';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import InfoIcon from '@mui/icons-material/Info';

import User from '@/components/User';
import Tooltip from '@/components/Tooltip';

function ChatHeader() {
  return (
    <div
      className={clsx(
        'relative z-50',
        'flex items-center justify-between p-4 border-b border-lt-line dark:border-dk-line',
        'bg-white dark:bg-dk-cpn'
      )}>
      <div className={clsx('flex items-center ml-1')}>
        <User view='small' />
        <span className={clsx('ml-3 font-bold', 'dark:text-white')}>
          IG Dev
        </span>
      </div>
      <ul className={clsx('flex items-center')}>
        <li className={clsx('relative', 'group px-2', 'cursor-pointer')}>
          <PhoneIcon
            className={clsx(
              '!text-2xl',
              'text-primary-v1 dark:text-primary-v4'
            )}
          />
          <Tooltip title='Start a voice call' subClass='top-full' />
        </li>
        <li className={clsx('relative', 'group px-2', 'cursor-pointer')}>
          <VideoCameraBackIcon
            className={clsx(
              '!text-2xl',
              'text-primary-v1 dark:text-primary-v4'
            )}
          />
          <Tooltip title='Start a video call' subClass='top-full' />
        </li>
        <li className={clsx('relative', 'group px-2', 'cursor-pointer')}>
          <InfoIcon
            className={clsx(
              '!text-2xl',
              'text-primary-v1 dark:text-primary-v4'
            )}
          />
          <Tooltip
            title='Conversation information'
            subClass={clsx('top-full left-[unset] right-0', 'translate-x-0')}
          />
        </li>
      </ul>
    </div>
  );
}

export default ChatHeader;
