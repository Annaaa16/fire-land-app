// clsx
import clsx from 'clsx';

// material ui icons
import CheckIcon from '@mui/icons-material/Check';

import { BACKUPS } from '@/constants';

interface UserProps {
  view?: 'sm' | 'lg';
  avatar?: string;
  className?: string;
  user?: boolean;
  online?: boolean;
  rounded?: boolean;
  onClick?: () => void;
}

function User(props: UserProps) {
  const { view, avatar, className, user, online, rounded, onClick } = props;

  return (
    <div
      onClick={onClick}
      className={clsx('relative', 'group flex-shrink-0', 'cursor-pointer', [
        view === 'sm' && 'w-9 h-9',
        rounded && 'rounded-full',
        className,
      ])}>
      <img
        src={avatar || BACKUPS.AVATAR}
        alt='Avatar'
        className={clsx('relative', 'img-cover', rounded && 'rounded-full')}
        draggable={false}
      />

      {user && (
        <div
          className={clsx(
            'absolute left-1/2 -bottom-2.5',
            'flex-center w-3.5 h-3.5 p-px -translate-x-1/2 border border-white rounded-full',
            'bg-fb-green'
          )}>
          <CheckIcon className={clsx('!w-full !h-full', 'text-white')} />
        </div>
      )}
      {online && (
        <span
          className={clsx(
            'absolute -right-1 -bottom-px z-[1]',
            'w-2.5 h-2.5 border-2 border-white dark:border-gray-700 rounded-full',
            'bg-fb-green dark:bg-primary-v4-hv'
          )}
        />
      )}
    </div>
  );
}

export default User;
