// clsx
import clsx from 'clsx';

// material ui icons
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

import { useUsersSelector } from '@/redux/selectors';
import { actions, usersActions } from '@/redux/slices/usersSlice';
import useUsers from '@/hooks/useUsers';

import User from '@/components/User';
import Spinner from '../Spinner';
import useStoreDispatch from '@/hooks/useStoreDispatch';

interface PostHeaderBoxProps {
  userId: string;
  username: string;
  avatar: string;
  followers: string[];
}

function PostHeaderBox(props: PostHeaderBoxProps) {
  const { username, avatar, userId, followers } = props;

  const { visitWall } = useUsers();
  const { currentUser, loadings } = useUsersSelector();

  const dispatch = useStoreDispatch();

  const { friends } = currentUser;
  const isFriend = friends.includes(userId);
  const isLoading =
    loadings.includes(actions.addFriendUser) ||
    loadings.includes(actions.unfriendUser);

  const handleMakeFriend = () => {
    if (!userId) return;

    const addFriend = () => {
      dispatch(usersActions.addFriendUserRequest({ userId }));
    };
    const unfriend = () => {
      dispatch(usersActions.unfriendUserRequest({ userId }));
    };

    isFriend ? unfriend() : addFriend();
  };

  return (
    <div
      className={clsx(
        'absolute bottom-full left-0',
        'scale-0 opacity-0 invisible pb-4 w-87',
        'transition-all ease-out',
        'pointer-events-none',
        'lg:group-hover:scale-100 origin-bottom-left lg:group-hover:opacity-100 lg:group-hover:visible group-hover:pointer-events-auto'
      )}>
      <div
        className={clsx(
          'relative',
          'px-3 pb-3 pt-5 shadow-box rounded-xl',
          'dark:text-white bg-white dark:bg-dk-cpn'
        )}>
        <div className={clsx('flex items-center mb-6')}>
          <User
            onClick={() => visitWall(userId)}
            avatar={avatar}
            className={clsx('w-14 h-14 mr-2')}
            rounded
          />
          <div>
            <h2
              onClick={() => visitWall(userId)}
              className={clsx(
                'font-semibold text-lg mb-4 ml-0.5',
                'cursor-pointer',
                'lg:hover:underline'
              )}>
              {username}
            </h2>
            <div className={clsx('flex items-center')}>
              <RssFeedIcon />
              <div className={clsx('ml-1 text-sm-1')}>
                <span>Followed by </span>
                <strong
                  className={clsx('cursor-pointer', 'lg:hover:underline')}>
                  {followers?.length} people
                </strong>
              </div>
            </div>
          </div>
        </div>
        <div className={clsx('flex-between h-9')}>
          <button
            onClick={() => !isLoading && handleMakeFriend()}
            className={clsx(
              'flex-center flex-grow h-full rounded-lg px-5',
              isFriend
                ? 'bg-gray-200 dark:bg-gray-700'
                : 'bg-primary-v1 dark:bg-primary-v4',
              'transition-all ease-out',
              isFriend
                ? 'hover:bg-gray-300 dark:hover:bg-dk-tooltip'
                : 'hover:bg-primary-v1-hv dark:hover:bg-primary-v4-hv'
            )}>
            {!isLoading ? (
              <>
                {isFriend ? (
                  <PersonRemoveIcon className={clsx('mr-1 !text-lg')} />
                ) : (
                  <PersonAddIcon
                    className={clsx('mr-1 !text-lg', 'text-white')}
                  />
                )}
                <span
                  className={clsx(
                    'font-semibold text-sm-1',
                    !isFriend && 'text-white'
                  )}>
                  {isFriend ? 'Unfriend' : 'Add Friend'}
                </span>
              </>
            ) : (
              <Spinner />
            )}
          </button>

          <button
            className={clsx(
              'h-full px-5 rounded-lg mx-2',
              'bg-gray-200 dark:bg-gray-700',
              'transition-all ease-out',
              'hover:bg-gray-300 dark:hover:bg-dk-tooltip'
            )}>
            <ChatIcon className={clsx('!text-lg')} />
            <span className={clsx('font-semibold ml-1 text-sm-1')}>
              Message
            </span>
          </button>

          <button
            className={clsx(
              'h-full px-4 rounded-lg',
              'bg-gray-200 dark:bg-gray-700',
              'transition-all ease-out',
              'hover:bg-gray-300 dark:hover:bg-dk-tooltip'
            )}>
            <MoreHorizOutlinedIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostHeaderBox;
