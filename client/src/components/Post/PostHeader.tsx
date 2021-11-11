// clsx
import clsx from 'clsx';

// react timeago
import Timeago from 'react-timeago';

// material ui icons
import GroupIcon from '@mui/icons-material/Group';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { useUsersSelector } from '@/redux/selectors';
import { useGlobalContext } from '@/contexts/GlobalContext';

import User from '@/components/User';
import PostHeaderOptions from './PostHeaderOptions';
import PostHeaderBox from './PostHeaderBox';

interface PostHeaderProps {
  userId: string;
  postId: string;
  username: string;
  avatar: string;
  createdAt: string;
  followers: string[];
}

function PostHeader(props: PostHeaderProps) {
  const { postId, username, avatar, userId, followers, createdAt } = props;

  const { visitWall } = useGlobalContext();
  const { currentUser } = useUsersSelector();

  return (
    <div className={clsx('relative', 'flex items-center px-2 md:px-4 py-4')}>
      <div className={clsx('flex items-center')}>
        <div className={clsx('relative', 'group ml-1 md:ml-0 z-0')}>
          <User
            avatar={avatar}
            view='sm'
            rounded
            onHandleClick={() => visitWall(userId)}
          />
          {currentUser._id !== userId && (
            <PostHeaderBox
              userId={userId}
              username={username}
              avatar={avatar}
              followers={followers}
            />
          )}
        </div>
        <div className={clsx('ml-3')}>
          <span
            onClick={() => visitWall(userId)}
            className={clsx(
              'font-bold',
              'dark:text-white',
              'cursor-pointer',
              'lg:hover:underline'
            )}>
            {username}
          </span>
          <div className={clsx('flex items-center mt-1')}>
            <Timeago
              live={false}
              date={createdAt}
              className={clsx(
                'text-xs mr-1',
                'text-gray',
                'cursor-pointer',
                'lg:hover:underline'
              )}
            />
            <GroupIcon className={clsx('!text-[15px]', 'text-gray')} />
          </div>
        </div>
      </div>
      <div className={clsx('relative', 'group ml-auto', 'cursor-pointer')}>
        <MoreHorizIcon
          fontSize='large'
          className={clsx(
            'text-gray-400',
            'lg:group-hover:text-gray-500 lg:dark:group-hover:text-white'
          )}
        />

        <PostHeaderOptions postId={postId} userId={userId} />
      </div>
    </div>
  );
}

export default PostHeader;
