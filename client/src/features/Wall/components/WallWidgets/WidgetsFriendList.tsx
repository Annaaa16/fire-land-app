import { useEffect } from 'react';
import { useRouter } from 'next/router';

// clsx
import clsx from 'clsx';

import { useUsersSelector } from '@/redux/selectors';
import { userActions } from '@/redux/slices/usersSlice';
import { useGlobalContext } from '@/contexts/GlobalContext';
import useStoreDispatch from '@/hooks/useStoreDispatch';
import useUsers from '@/hooks/useUsers';

import Avatar from '@/components/Avatar';

function WidgetsFriendList() {
  const { notifyMaintain } = useGlobalContext();
  const { friends, userProfile } = useUsersSelector();

  const { visitWall } = useUsers();
  const dispatch = useStoreDispatch();
  const router = useRouter();

  // Fetch init user's friends
  useEffect(() => {
    const { id } = router.query;

    if (!id) return;

    dispatch(
      userActions.getFriendsRequest({
        userId: id as string,
        params: { page: 1, limit: 10 },
      })
    );
  }, [router.query, dispatch]);

  return (
    <div
      className={clsx(
        'p-4 rounded-lg shadow-md dark:shadow-xl mt-5',
        'bg-white dark:bg-dk-cpn'
      )}>
      <div className={clsx('flex-between')}>
        <h2 className={clsx('text-base font-semibold', 'dark:text-white')}>
          Friends
        </h2>
        <span
          onClick={notifyMaintain}
          className={clsx(
            'text-sm-1',
            'text-primary-v1 dark:text-primary-v4',
            'transition-all duration-300 ease-out',
            'hover:text-primary-v1-hv dark:hover:text-primary-v4-hv',
            'cursor-pointer select-none'
          )}>
          See All Friends
        </span>
      </div>
      <div className={clsx('mt-3', 'dark:text-white')}>
        {userProfile.friends.length} friends
      </div>
      <ul className={clsx('grid grid-cols-4 mt-2 gap-x-2')}>
        {friends.map((friend) => (
          <li
            key={friend._id}
            onClick={() => visitWall(friend._id)}
            className={clsx('mt-3')}>
            <Avatar
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
