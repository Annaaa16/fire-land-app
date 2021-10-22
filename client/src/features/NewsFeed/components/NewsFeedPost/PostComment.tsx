// clsx
import clsx from 'clsx';

// types
import { Comment } from '@/models/common';

interface PostCommentProps {
  comment: Comment;
}

function PostComment({ comment }: PostCommentProps) {
  const { content, user } = comment;

  return (
    <div className={clsx('flex mb-2')}>
      <div className={clsx('h-8 w-8 mt-1 flex-shrink-0 mr-2')}>
        <img
          src={user?.avatar}
          alt='Avatar'
          className={clsx(
            'w-full h-full rounded-full object-contain',
            'cursor-pointer'
          )}
        />
      </div>
      <div className={clsx('flex-grow')}>
        <div
          className={clsx(
            'mb-1 px-3 py-2 rounded-xl',
            'bg-lt-input dark:bg-dk-input'
          )}>
          <h4
            className={clsx(
              'inline-block font-bold mb-1.5 text-xs lg:text-2sm leading-4',
              'dark:text-white',
              'cursor-pointer',
              'hover:underline'
            )}>
            {user?.username}
          </h4>
          <p
            className={clsx(
              'leading-4 text-xs lg:text-2sm',
              'dark:text-white'
            )}>
            {content}
          </p>
        </div>
        <div className={clsx('flex items-center ml-3')}>
          <span
            className={clsx(
              'font-bold mr-2 text-xs',
              'dark:text-gray',
              'cursor-pointer',
              'hover:underline'
            )}>
            Like
          </span>
          <span
            className={clsx(
              'font-bold mr-2 text-xs',
              'dark:text-gray',
              'cursor-pointer',
              'hover:underline'
            )}>
            Reply
          </span>
          <span
            className={clsx(
              'text-xs',
              'cursor-pointer',
              'dark:text-gray',
              'hover:underline'
            )}>
            3m
          </span>
        </div>
      </div>
    </div>
  );
}

export default PostComment;
