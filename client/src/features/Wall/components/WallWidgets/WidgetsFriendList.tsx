import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

// clsx
import clsx from 'clsx';

import { useUsersSelector } from '@/redux/selectors';
import { useGlobalContext } from '@/contexts/GlobalContext';
import { usersActions } from '@/redux/slices/usersSlice';
import useStoreDispatch from '@/hooks/useStoreDispatch';

import User from '@/components/User';

function WidgetsFriendList() {
  const { visitWall } = useGlobalContext();
  const { friends, userProfile } = useUsersSelector();
  const dispatch = useStoreDispatch();
  const router = useRouter();

  // Fetch init user's friends
  useEffect(() => {
    const { id } = router.query;

    // Block first load ID is undefined
    if (id) {
      dispatch(
        usersActions.getFriendsRequest({
          userId: id as string,
          params: { page: 1, limit: 10 },
        })
      );
    }
  }, [router.query, dispatch]);

  return (
    <div
      className={clsx(
        'p-4 rounded-lg shadow-md dark:shadow-xl mt-5',
        'bg-white dark:bg-dk-cpn'
      )}>
      <div className={clsx('flex items-center justify-between')}>
        <h2 className={clsx('text-base font-semibold', 'dark:text-white')}>
          Friends
        </h2>
        <Link href='#'>
          <a
            className={clsx(
              'text-sm-1',
              'text-primary-v1 dark:text-primary-v4',
              'transition-all duration-300 ease-out',
              'hover:text-primary-v1-hv dark:hover:text-primary-v4-hv'
            )}>
            See All Friends
          </a>
        </Link>
      </div>
      <div className={clsx('mt-3', 'dark:text-white')}>
        {userProfile.followings.length} friends
      </div>
      <ul className={clsx('grid grid-cols-4 mt-2 gap-x-2')}>
        {friends.map((friend) => (
          <li
            key={friend._id}
            onClick={() => visitWall(friend._id)}
            className={clsx('mt-3')}>
            <User
              className='rounded-lg mx-auto overflow-hidden'
              avatar={friend.avatar}
            />
            <div
              className={clsx('text-center text-xs mt-1', 'dark:text-white')}>
              {friend.username}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WidgetsFriendList;
