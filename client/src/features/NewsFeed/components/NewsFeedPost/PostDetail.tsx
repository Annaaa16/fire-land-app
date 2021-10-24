// clsx
import clsx from 'clsx';

import { useUsersSelector } from '@/redux/selectors';

import like from '@/assets/svgs/NewsFeed/like.svg';
import haha from '@/assets/svgs/NewsFeed/haha.svg';
import love from '@/assets/svgs/NewsFeed/love.svg';

interface PostDetailProps {
  likes: string[];
  commentCount: number;
}

function PostDetail(props: PostDetailProps) {
  const { likes, commentCount } = props;

  const { currentUser } = useUsersSelector();

  return (
    <div className={clsx('flex items-center justify-between h-5')}>
      <div className={clsx('flex items-center')}>
        {likes.length > 0 && (
          <>
            <div className={clsx('flex items-center mr-2')}>
              <div
                className={clsx(
                  'z-[3]',
                  'w-4.5 md:w-5 rounded-full border border-white dark:border-dk-cpn',
                  'bg-white dark:bg-dk-cpn',
                  'cursor-pointer'
                )}>
                <img
                  className={clsx('w-full h-full')}
                  src={like.src}
                  alt='Like'
                />
              </div>
              <div
                className={clsx(
                  'z-[2]',
                  'w-4.5 md:w-5 -ml-0.5 rounded-full border border-white dark:border-dk-cpn',
                  'bg-white dark:bg-dk-cpn',
                  'cursor-pointer'
                )}>
                <img
                  className={clsx('w-full h-full')}
                  src={love.src}
                  alt='Love'
                />
              </div>
              <div
                className={clsx(
                  'z-[1]',
                  'w-4.5 md:w-5 -ml-0.5 rounded-full border border-white dark:border-dk-cpn',
                  'bg-white dark:bg-dk-cpn',
                  'cursor-pointer'
                )}>
                <img
                  className={clsx('w-full h-full')}
                  src={haha.src}
                  alt='Haha'
                />
              </div>
            </div>
            <span
              className={clsx(
                'pt-0.5 text-xs md:text-sm',
                'text-gray',
                'cursor-pointer',
                'lg:hover:underline'
              )}>
              {likes.includes(currentUser._id) && likes.length === 1
                ? currentUser.username
                : likes.includes(currentUser._id) && likes.length > 1
                ? `You and ${likes.length - 1} others`
                : likes.length}
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
