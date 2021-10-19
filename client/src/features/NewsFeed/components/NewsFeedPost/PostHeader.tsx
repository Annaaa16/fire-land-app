// clsx
import clsx from 'clsx';

// material ui icons
import GroupIcon from '@mui/icons-material/Group';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { useUsersSelector } from '@/redux/selectors';

import User from '@/components/User';
import PostHeaderOptions from './PostHeaderOptions';
import PostHeaderBox from './PostHeaderBox';

interface PostHeaderProps {
  userId: string;
  postId: string;
  username: string;
  avatar: string;
}

function PostHeader(props: PostHeaderProps) {
  const { postId, username, avatar, userId } = props;

  const { currentUser } = useUsersSelector();

  return (
    <div className={clsx('relative', 'flex items-center px-2 md:px-4 py-4')}>
      <div className={clsx('flex items-center')}>
        <div className={clsx('relative', 'group ml-1 md:ml-0 z-0')}>
          <User avatar={avatar} view='small' />
          {currentUser._id !== userId && (
            <PostHeaderBox
              userId={userId}
              username={username}
              avatar={avatar}
            />
          )}
        </div>
        <div className={clsx('ml-4')}>
          <span
            className={clsx(
              'font-bold',
              'dark:text-white',
              'cursor-pointer',
              'lg:hover:underline'
            )}>
            {username}
          </span>
          <div className={clsx('flex items-center mt-1')}>
            <span
              className={clsx(
                'text-xs mr-1',
                'text-gray',
                'cursor-pointer',
                'lg:hover:underline'
              )}>
              30m
            </span>
            <GroupIcon className={clsx('!text-[15px]', 'text-gray')} />
          </div>
        </div>
      </div>
      <div className={clsx('relative', 'group ml-auto', 'cursor-pointer')}>
        <MoreHorizIcon
          fontSize='large'
          className={clsx(
            'text-gray-400',
            '!transition-all !ease-out',
            'lg:group-hover:text-gray-500 lg:dark:group-hover:text-white'
          )}
        />

        <PostHeaderOptions postId={postId} />
      </div>
    </div>
  );
}

export default PostHeader;
