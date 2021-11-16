// clsx
import clsx from 'clsx';

// material ui icons
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

import { useGlobalContext } from '@/contexts/GlobalContext';
import { useUsersSelector } from '@/redux/selectors';
import { actions } from '@/redux/slices/usersSlice';

import User from '@/components/User';
import Loading from '../Loading';

interface PostHeaderBoxProps {
  userId: string;
  username: string;
  avatar: string;
  followers: string[];
}

function PostHeaderBox(props: PostHeaderBoxProps) {
  const { username, avatar, userId, followers } = props;

  const { handleMakeFriend, visitWall } = useGlobalContext();
  const {
    currentUser: { followings },
    loadings,
  } = useUsersSelector();

  const isLoading =
    loadings.includes(actions.followUser) ||
    loadings.includes(actions.unfollowUser);

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
          'px-3 pb-3 pt-5 shadow-box rounded-xl',
          'dark:text-white bg-white dark:bg-dk-cpn'
        )}>
        <div className={clsx('flex items-center mb-6')}>
          <User
            onHandleClick={() => visitWall(userId)}
            avatar={avatar}
            subClass={clsx('w-14 h-14 mr-2')}
            rounded
          />
          <div>
            <h2
              onClick={() => visitWall(userId)}
              className={clsx(
                'font-bold text-lg mb-4 ml-0.5',
                'cursor-pointer',
                'hover:underline'
              )}>
              {username}
            </h2>
            <div className={clsx('flex items-center')}>
              <RssFeedIcon />
              <div className={clsx('ml-1')}>
                <span className={clsx('text-sm-1')}>Followed by </span>
                <strong
                  className={clsx(
                    'text-sm-1',
                    'cursor-pointer',
                    'hover:underline'
                  )}>
                  {followers?.length} people
                </strong>
              </div>
            </div>
          </div>
        </div>
        <div className={clsx('flex items-center h-9 justify-between')}>
          <button
            onClick={() => !isLoading && handleMakeFriend(userId)}
            className={clsx(
              'flex-center flex-grow h-full rounded-lg px-5',
              followings.includes(userId)
                ? 'bg-gray-200 dark:bg-gray-700'
                : 'bg-primary-v1 dark:bg-primary-v4',
              'transition-all ease-out',
              followings.includes(userId)
                ? 'hover:bg-gray-300 dark:hover:bg-dk-tooltip'
                : 'hover:bg-primary-v1-hv dark:hover:bg-primary-v4-hv'
            )}>
            {!isLoading ? (
              <>
                {followings.includes(userId) ? (
                  <PersonRemoveIcon className={clsx('mr-1 !text-lg')} />
                ) : (
                  <PersonAddIcon
                    className={clsx('mr-1 !text-lg', 'text-white')}
                  />
                )}
                <span
                  className={clsx(
                    'font-bold text-sm-1',
                    !followings.includes(userId) && 'text-white'
                  )}>
                  {followings.includes(userId) ? 'Unfriend' : 'Add Friend'}
                </span>
              </>
            ) : (
              <Loading />
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
            <span className={clsx('font-bold ml-1 text-sm-1')}>Message</span>
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
