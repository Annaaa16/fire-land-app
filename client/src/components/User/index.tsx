// clsx
import clsx from 'clsx';

// material ui icons
import CheckIcon from '@mui/icons-material/Check';

interface UserProps {
  view?: 'sm';
  avatar?: string;
  subClass?: string;
  currentUser?: boolean;
  online?: boolean;
  rounded?: boolean;
  width?: number;
  height?: number;
}

function User(props: UserProps) {
  const {
    view,
    avatar,
    subClass,
    currentUser,
    online,
    rounded,
    width,
    height,
  } = props;

  const img = avatar || 'https://avatars.dicebear.com/api/micah/uiSvbW.svg';

  return (
    <div
      className={clsx(
        'relative',
        view === 'sm' && 'w-9 h-9',
        'group flex-shrink-0',
        rounded && 'rounded-full',
        'cursor-pointer',
        subClass
      )}>
      <img
        src={img}
        alt='Avatar'
        className={clsx(
          'relative',
          'w-full h-full object-cover',
          rounded && 'rounded-full'
        )}
      />

      {currentUser && (
        <div
          className={clsx(
            'absolute left-1/2 -bottom-2.5',
            'i-flex-center w-3.5 h-3.5 p-px -translate-x-1/2 border border-white rounded-full',
            'bg-green'
          )}>
          <CheckIcon className={clsx('!w-full !h-full', 'text-white')} />
        </div>
      )}
      {online && (
        <span
          className={clsx(
            'absolute -left-px top-0.5 z-[1]',
            'w-2.5 h-2.5 border-2 border-white rounded-full',
            'bg-green'
          )}
        />
      )}
    </div>
  );
}

export default User;
