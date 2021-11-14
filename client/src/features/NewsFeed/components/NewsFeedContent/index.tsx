import { useEffect, useRef } from 'react';

// clsx
import clsx from 'clsx';

import { LIMITS } from '@/constants';
import { usePostsSelector } from '@/redux/selectors';
import { postsActions } from '@/redux/slices/postsSlice';
import useMeeting from '@/hooks/useMeeting';
import useStoreDispatch from '@/hooks/useStoreDispatch';

import Post from '@/components/Post';
import NewsFeedSender from '../NewsFeedSender';

function NewsFeedContent() {
  const loaderRef = useRef<HTMLDivElement>(null);

  const { nextPage, total, posts } = usePostsSelector();

  const dispatch = useStoreDispatch();

  const isMeeting = useMeeting(loaderRef, '500px');

  // Get new posts when scrolled to bottom
  useEffect(() => {
    if (isMeeting && nextPage) {
      dispatch(
        postsActions.getPostsRequest({ page: nextPage, limit: LIMITS.POSTS })
      );
    }
  }, [total, isMeeting, nextPage, dispatch]);

  return (
    <div className={clsx('w-full lg:w-2/3 lg:mr-5')}>
      <NewsFeedSender />

      {posts.length > 0 &&
        posts.map((post) => <Post key={post._id} {...post} />)}

      <div ref={loaderRef} />
    </div>
  );
}

export default NewsFeedContent;
