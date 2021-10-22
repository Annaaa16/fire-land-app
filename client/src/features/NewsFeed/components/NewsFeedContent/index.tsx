import { useEffect, useRef } from 'react';

// clsx
import clsx from 'clsx';

import { usePostsSelector } from '@/redux/selectors';
import { getPosts } from '@/redux/actions/posts';
import { LIMITS } from '@/constants';
import useMeeting from '@/hooks/useMeeting';
import useStoreDispatch from '@/hooks/useStoreDispatch';

import NewsFeedPost from '../NewsFeedPost';
import NewsFeedSender from '../NewsFeedSender';

function NewsFeedContent() {
  const loaderRef = useRef<HTMLDivElement>(null);

  const { nextPage, total, posts } = usePostsSelector();

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
    <div className={clsx('col-span-2')}>
      <NewsFeedSender />

      {posts.map((post) => (
        <NewsFeedPost key={post._id} {...post} />
      ))}

      <div ref={loaderRef} />
    </div>
  );
}

export default NewsFeedContent;
