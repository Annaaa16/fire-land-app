// clsx
import clsx from 'clsx';

// material ui icons
import CheckIcon from '@mui/icons-material/Check';

interface UserProps {
  view: string;
  avatar?: string;
  subClass?: string;
}

function User(props: UserProps) {
  const { view, avatar, subClass } = props;

  const img = avatar || 'https://avatars.dicebear.com/api/micah/uiSvbW.svg';
  const isUser = true;

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
        className={clsx('relative', 'w-full h-full object-cover rounded-full')}
      />

      {isUser ? (
        <div
          className={clsx(
            'absolute left-1/2 -bottom-2.5',
            'i-flex-center w-3.5 h-3.5 p-px -translate-x-1/2 border border-white rounded-full',
            'bg-green'
          )}>
          <CheckIcon className={clsx('!w-full !h-full', 'text-white')} />
        </div>
      ) : (
        <span
          className={clsx(
            'absolute -left-px top-0.5 z-[1]',
            'w-2.5 h-2.5 border-2 border-white rounded-full',
            'bg-green'
          )}>
          .
        </span>
      )}
    </div>
  );
}

export default User;
