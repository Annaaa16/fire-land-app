// clsx
import clsx from 'clsx';

// material ui icons
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

import { useUsersSelector } from '@/redux/selectors';
import { followUser, unfollowUser } from '@/redux/actions/users';
import useStoreDispatch from '@/hooks/useStoreDispatch';

import User from '@/components/User';

interface PostHeaderBoxProps {
  userId: string;
  username: string;
  avatar: string;
}

function PostHeaderBox(props: PostHeaderBoxProps) {
  const { username, avatar, userId } = props;

  const {
    currentUser: { followings },
  } = useUsersSelector();

  const dispatch = useStoreDispatch();

  return (
    <div
      className={clsx(
        'absolute bottom-full left-0',
        'scale-0 opacity-0 invisible pb-2',
        'transition-all ease-out',
        'pointer-events-none',
        'group-hover:scale-100 origin-bottom-left group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto'
      )}>
      <div
        className={clsx(
          'min-w-max px-3 pb-3 pt-5 shadow-box rounded-xl',
          'dark:text-white bg-white dark:bg-dk-cpn'
        )}>
        <div className={clsx('flex items-center mb-6')}>
          <User avatar={avatar} view='large' subClass={clsx('mr-2')} />
          <div>
            <h2
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
                <span className={clsx('text-2sm')}>Followed by </span>
                <strong
                  className={clsx(
                    'text-2sm',
                    'cursor-pointer',
                    'hover:underline'
                  )}>
                  1000 people
                </strong>
              </div>
            </div>
          </div>
        </div>
        <div className={clsx('flex items-center h-9 justify-between')}>
          <button
            onClick={() =>
              dispatch(
                followings.includes(userId)
                  ? unfollowUser.request(userId)
                  : followUser.request(userId)
              )
            }
            className={clsx(
              'i-flex-center flex-grow h-full rounded-lg px-6',
              followings.includes(userId)
                ? 'bg-gray-200 dark:bg-gray-700'
                : 'bg-primary-v1 dark:bg-primary-v4',
              'transition-all ease-out',
              followings.includes(userId)
                ? 'hover:bg-gray-300 dark:hover:bg-dk-tooltip-hv'
                : 'hover:bg-primary-v1-hv dark:hover:bg-primary-v4-hv'
            )}>
            {followings.includes(userId) ? (
              <PersonRemoveIcon className={clsx('mr-1 !text-lg')} />
            ) : (
              <PersonAddIcon className={clsx('mr-1 !text-lg', 'text-white')} />
            )}
            <span
              className={clsx(
                'font-bold text-2sm',
                !followings.includes(userId) && 'text-white'
              )}>
              {followings.includes(userId) ? 'Unfriend' : 'Add Friend'}
            </span>
          </button>

          <button
            className={clsx(
              'h-full px-6 rounded-lg mx-2',
              'bg-gray-200 dark:bg-gray-700',
              'transition-all ease-out',
              'hover:bg-gray-300 dark:hover:bg-dk-tooltip-hv'
            )}>
            <ChatIcon className={clsx('!text-lg')} />
            <span className={clsx('font-bold ml-1 text-2sm')}>Message</span>
          </button>

          <button
            className={clsx(
              'h-full px-4 rounded-lg',
              'bg-gray-200 dark:bg-gray-700',
              'transition-all ease-out',
              'hover:bg-gray-300 dark:hover:bg-dk-tooltip-hv'
            )}>
            <MoreHorizOutlinedIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostHeaderBox;
