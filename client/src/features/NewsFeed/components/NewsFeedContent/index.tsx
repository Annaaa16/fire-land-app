import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

// clsx
import clsx from 'clsx';

import { postsState$ } from '@/redux/selectors';
import { getPosts } from '@/redux/actions/posts';
import { LIMIT_POSTS } from '@/constants';
import useMeeting from '@/hooks/useMeeting';
import useMyDispatch from '@/hooks/useMyDispatch';

import NewsFeedPost from '../NewsFeedPost';
import NewsFeedSender from '../NewsFeedSender';

function NewsFeedContent() {
  const loaderRef = useRef(null);

  const { nextPage, total, posts } = useSelector(postsState$);

  const dispatch = useMyDispatch();

  const isMeeting = useMeeting(loaderRef, '500px');

  // Get new posts when scrolled to bottom
  useEffect(() => {
    if (isMeeting && nextPage) {
      dispatch(getPosts.request({ page: nextPage, limit: LIMIT_POSTS }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, isMeeting, dispatch]);

  return (
    <div className={clsx('col-span-2')}>
      <NewsFeedSender />

      {posts.map((post, index) => (
        <NewsFeedPost key={index} {...post} />
      ))}

      <div ref={loaderRef} />
    </div>
  );
}

export default NewsFeedContent;
