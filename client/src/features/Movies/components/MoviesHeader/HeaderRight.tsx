// clsx
import clsx from 'clsx';

import { useUsersSelector } from '@/redux/selectors';

function HeaderRight() {
  const { currentUser } = useUsersSelector();

  return (
    <div className={clsx('hidden md:block w-10', 'cursor-pointer')}>
      <img
        src={currentUser.avatar}
        alt='Avatar'
        className={clsx('w-full h-full')}
      />
    </div>
  );
}

export default HeaderRight;
