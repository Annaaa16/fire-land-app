import { useEffect, useRef } from 'react';

// clsx
import clsx from 'clsx';

import { usePostsSelector, useUsersSelector } from '@/redux/selectors';
import { getPosts } from '@/redux/actions/posts';
import { LIMITS } from '@/constants';
import useMeeting from '@/hooks/useMeeting';
import useStoreDispatch from '@/hooks/useStoreDispatch';

import Post from '@/components/Post';
import NewsFeedSender from '@/features/NewsFeed/components/NewsFeedSender';

function WallContent() {
  const loaderRef = useRef<HTMLDivElement>(null);

  const { nextPage, total, posts } = usePostsSelector();
  const { currentUser } = useUsersSelector();

  const dispatch = useStoreDispatch();

  const isMeeting = useMeeting(loaderRef, '500px');

  // Get new posts when scrolled to bottom
  useEffect(() => {
    if (isMeeting && nextPage) {
      dispatch(getPosts.request({ page: nextPage, limit: LIMITS.POSTS }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, isMeeting, dispatch]);

  return (
    <div className={clsx('w-full lg:w-2/3')}>
      <NewsFeedSender />

      {posts.map((post) => {
        return (
          currentUser._id === post.user._id && <Post key={post._id} {...post} />
        );
      })}

      <div ref={loaderRef} />
    </div>
  );
}

export default WallContent;
