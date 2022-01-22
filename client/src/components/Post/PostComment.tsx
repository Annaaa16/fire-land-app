// clsx
import clsx from 'clsx';

// react timeago
import Timeago from 'react-timeago';

// types
import { Comment } from '@/models/common';

import useUsers from '@/hooks/useUsers';

import Avatar from '../Avatar';

interface PostCommentProps {
  comment: Comment;
}

function PostComment({ comment }: PostCommentProps) {
  const { content, user, createdAt } = comment;

  const { visitWall } = useUsers();

  return (
    <div className={clsx('flex mb-2')}>
      <Avatar
        onClick={() => visitWall(user._id)}
        avatar={user?.avatar}
        view='sm'
        className='mr-2'
      />
      <div className={clsx('flex-grow')}>
        <div
          className={clsx(
            'mb-1 px-3 py-2 rounded-xl',
            'bg-lt-input dark:bg-dk-input'
          )}>
          <h4
            onClick={() => visitWall(user._id)}
            className={clsx(
              'inline-block font-semibold mb-1.5 text-xs lg:text-sm-1 leading-4',
              'dark:text-white',
              'cursor-pointer',
              'hover:underline'
            )}>
            {user?.username}
          </h4>
          <p
            className={clsx(
              'leading-4 text-xs lg:text-sm-1',
              'dark:text-white'
            )}>
            {content}
          </p>
        </div>
        <div className={clsx('flex items-center ml-3')}>
          <span
            className={clsx(
              'font-semibold mr-2 text-xs',
              'dark:text-gray',
              'cursor-pointer',
              'hover:underline'
            )}>
            Like
          </span>
          <span
            className={clsx(
              'font-semibold mr-2 text-xs',
              'dark:text-gray',
              'cursor-pointer',
              'hover:underline'
            )}>
            Reply
          </span>
          <Timeago
            live={false}
            date={createdAt}
            className={clsx(
              'text-xs',
              'cursor-pointer',
              'dark:text-gray',
              'hover:underline'
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default PostComment;
