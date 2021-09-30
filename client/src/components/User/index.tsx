// clsx
import clsx from 'clsx';

// material ui icons
import CheckIcon from '@mui/icons-material/Check';

import borderLtIcon from '@/assets/images/border-lt.png';
import borderDkIcon from '@/assets/images/border-dk.png';

interface UserProps {
  view: string;
  avatar?: string;
  subClass?: string;
}

function User(props: UserProps) {
  const { view, avatar, subClass } = props;

  const img = avatar || 'https://avatars.dicebear.com/api/micah/uiSvbW.svg';
  const isUser = true;
  const isDark = false;

  return (
    <div
      className={clsx(
        'relative',
        view === 'small' ? 'w-9 h-9' : 'w-16 h-16',
        'group rounded-full flex-shrink-0',
        'cursor-pointer',
        subClass
      )}>
      <img
        src={img}
        alt='Avatar'
        className={clsx(
          'relative z-10',
          'w-full h-full object-cover rounded-full'
        )}
      />

      {isUser ? (
        <div
          className={clsx(
            'absolute z-10 left-1/2 -bottom-2.5',
            'i-flex-center w-3.5 h-3.5 p-px -translate-x-1/2 border border-white rounded-full',
            'bg-green'
          )}>
          <CheckIcon className={clsx('!w-full !h-full', 'text-white')} />
        </div>
      ) : (
        <span
          className={clsx(
            'absolute -left-px top-0.5',
            'w-2.5 h-2.5 border-2 border-white rounded-full',
            'bg-green'
          )}>
          .
        </span>
      )}

      <span
        className={clsx(
          'absolute z-10 -right-1.5 -top-1',
          'i-flex-center translate-x-3 text-2xs font-bold px-1.5 h-[17px] min-w-[26px] border-2 border-white rounded-full opacity-0 invisible',
          'bg-primary-v1 text-white',
          'transition-all duration-250 ease-out',
          'group-hover:translate-x-1 group-hover:opacity-100 group-hover:visible'
        )}>
        2
      </span>
      <div>
        <img
          src={isDark ? borderDkIcon.src : borderLtIcon.src}
          alt='Border'
          className={clsx(
            'absolute top-1/2 left-1/2',
            '-translate-x-1/2 -translate-y-1/2 scale-[1.2] opacity-50',
            'brightness-75',
            'transition-all duration-250 ease-in-out',
            'group-hover:rotate-[-30deg] group-hover:opacity-100'
          )}
        />
      </div>
    </div>
  );
}

export default User;
