// clsx
import clsx from 'clsx';

// material ui icons
import GroupIcon from '@mui/icons-material/Group';
import ChatIcon from '@mui/icons-material/Chat';
import Tooltip from '@/components/Tooltip';

function NewsFeedMembers() {
  return (
    <div
      className={clsx(
        'flex items-center justify-between mt-7 p-4 shadow-md rounded-xl',
        'bg-lt-cpn dark:bg-dk-cpn'
      )}>
      <div className={clsx('flex items-center')}>
        <div
          className={clsx(
            'i-flex-center w-11 h-11 mr-3 rounded-full',
            'bg-[#eff4fb] dark:bg-primary-v4'
          )}>
          <GroupIcon className={clsx('text-primary-v1 dark:text-white')} />
        </div>
        <span className={clsx('text-dk-gray dark:text-dk-text')}>
          Total members:
        </span>
        <span className={clsx('ml-1 font-bold', 'dark:text-primary-v4')}>
          08
        </span>
      </div>

      <div
        className={clsx(
          'relative',
          'i-flex-center group w-11 h-11 mr-2 rounded-full',
          'bg-[#eff4fb] dark:bg-primary-v4',
          'cursor-pointer'
        )}>
        <ChatIcon className={clsx('text-primary-v1 dark:text-white')} />
        <Tooltip title='Go to chat room!' direction='ttb' />
      </div>
    </div>
  );
}

export default NewsFeedMembers;
