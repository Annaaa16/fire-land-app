import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

// clsx
import clsx from 'clsx';

import { usePostsSelector } from '@/redux/selectors';
import { LIMITS } from '@/constants';
import { postsActions } from '@/redux/slices/postsSlice';
import { actions } from '@/redux/slices/postsSlice';
import useMeeting from '@/hooks/useMeeting';
import useStoreDispatch from '@/hooks/useStoreDispatch';

import Post from '@/components/Post';
import NewsFeedSender from '@/features/NewsFeed/components/NewsFeedSender';
import PostLoading from '@/components/PostLoading';

function WallContent() {
  const loaderRef = useRef<HTMLDivElement>(null);

  const { nextPage, total, posts, loadings } = usePostsSelector();
  const router = useRouter();

  const dispatch = useStoreDispatch();
  const isMeeting = useMeeting(loaderRef, '500px');

  // Get new posts when scrolled to bottom
  useEffect(() => {
    const { id } = router.query;

    if (isMeeting && nextPage && id) {
      dispatch(
        postsActions.getPostsRequest({
          user_id: id as string,
          page: nextPage,
          limit: LIMITS.POSTS,
        })
      );
    }
  }, [total, isMeeting, router.query, nextPage, dispatch]);

  return (
    <div className={clsx('w-full lg:w-2/3')}>
      <NewsFeedSender />

      {posts.map((post) => {
        return <Post key={post._id} {...post} />;
      })}

      <div ref={loaderRef} />

      {loadings.includes(actions.getPosts) && (
        <>
          <PostLoading />
          <PostLoading />
        </>
      )}
    </div>
  );
}

export default WallContent;
