// clsx
import clsx from 'clsx';

// material ui icons
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

// types
import { User } from '@/models/common';

import { useUsersSelector } from '@/redux/selectors';
import { actions } from '@/redux/slices/usersSlice';
import useUsers from '@/hooks/useUsers';

import Avatar from '@/components/Avatar';
import Spinner from '@/components/Spinner';

function PeopleItem(props: User) {
  const { currentUser, loadings } = useUsersSelector();

  const { visitWall, makeFriend } = useUsers();

  const isLoading =
    loadings.includes(actions.addFriendUser) ||
    loadings.includes(actions.unfriendUser);

  const isFriend = (userId: string) => currentUser.friends.includes(userId);

  return (
    <li
      key={props._id}
      className={clsx(
        'flex px-4 py-4 shadow-md rounded-lg',
        'bg-white dark:bg-dk-cpn'
      )}>
      <Avatar
        onClick={() => visitWall(props._id)}
        className={clsx('w-9 md:w-12 h-9 md:h-12 mr-4')}
        rounded
        avatar={props.avatar}
      />
      <div className={clsx('flex flex-col gap-1')}>
        <span
          onClick={() => visitWall(props._id)}
          className={clsx(
            'font-bold text-sm-1',
            'dark:text-white',
            'cursor-pointer',
            'hover:underline'
          )}>
          {props.username}
        </span>
        <span
          className={clsx(
            'text-sm-1',
            'text-gray-lt dark:text-white',
            'cursor-pointer',
            'hover:underline'
          )}>
          {props.followers.length} followers
        </span>
      </div>
      {currentUser._id !== props._id && (
        <div
          onClick={() => !isLoading && makeFriend(props._id, props.username)}
          className={clsx(
            'flex-center w-9 md:w-11 h-9 md:h-11 rounded-full ml-auto',
            'transition-all',
            'cursor-pointer',
            isFriend(props._id)
              ? [
                  'bg-gray-200 dark:bg-gray-700',
                  'hover:bg-gray-300 dark:hover:bg-gray-600',
                ]
              : [
                  'bg-primary-v1 dark:bg-primary-v4',
                  'hover:bg-primary-v1-hv dark:hover:bg-primary-v4-hv',
                ]
          )}>
          {isLoading ? (
            <Spinner />
          ) : isFriend(props._id) ? (
            <PersonRemoveIcon
              className={clsx('text-lg md:!text-xl', 'dark:text-white')}
            />
          ) : (
            <PersonAddIcon
              className={clsx('text-lg md:!text-xl', 'text-white')}
            />
          )}
        </div>
      )}
    </li>
  );
}

export default PeopleItem;
