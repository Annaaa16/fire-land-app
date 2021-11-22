// clsx
import clsx from 'clsx';

// types
import { Post } from '@/models/common';

import { useUsersSelector } from '@/redux/selectors';

import PostDetailReactions from './PostDetailReactions';

interface PostDetailProps {
  reactions: Post['reactions'];
  commentCount: Post['commentCount'];
}

function PostDetail(props: PostDetailProps) {
  const { reactions, commentCount } = props;

  const { currentUser } = useUsersSelector();

  const isReacted = reactions.some(
    (reaction) => reaction.userId === currentUser._id
  );

  return (
    <div className={clsx('flex items-center justify-between h-5')}>
      <div className={clsx('flex items-center')}>
        {reactions.length > 0 && (
          <>
            <PostDetailReactions reactions={reactions} />
            <span
              className={clsx(
                'pt-0.5 text-xs md:text-sm',
                'text-gray',
                'cursor-pointer',
                'lg:hover:underline'
              )}>
              {isReacted && reactions.length === 1
                ? currentUser.username
                : isReacted && reactions.length > 1
                ? 'You and ' + (reactions.length - 1) + ' others'
                : reactions.length}
            </span>
          </>
        )}
      </div>
      <div className={clsx('flex items-center')}>
        <span
          className={clsx(
            'mr-2 text-xs lg:text-sm',
            'text-gray',
            'cursor-pointer',
            'lg:hover:underline'
          )}>
          {commentCount} Comments
        </span>
        <span
          className={clsx(
            'text-xs lg:text-sm',
            'text-gray',
            'cursor-pointer',
            'lg:hover:underline'
          )}>
          1.1k Shares
        </span>
      </div>
    </div>
  );
}

export default PostDetail;
