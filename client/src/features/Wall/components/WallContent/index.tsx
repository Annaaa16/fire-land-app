import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

// clsx
import clsx from 'clsx';

import { usePostsSelector } from '@/redux/selectors';
import { LIMITS } from '@/constants';
import { postActions } from '@/redux/slices/postsSlice';
import { actions } from '@/redux/slices/postsSlice';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useStoreDispatch from '@/hooks/useStoreDispatch';

import Post from '@/components/Post';
import NewsFeedSender from '@/features/newsfeed/components/NewsFeedSender';
import LoadingPost from '@/components/Loading/LoadingPost';

function WallContent() {
  const loaderRef = useRef<HTMLDivElement>(null);

  const { nextPage, total, posts, loadings } = usePostsSelector();
  const router = useRouter();

  const dispatch = useStoreDispatch();
  const isIntersecting = useIntersectionObserver(loaderRef, '500px');

  // Get new posts when scrolled to bottom
  useEffect(() => {
    const { id } = router.query;

    if (isIntersecting && nextPage && id) {
      dispatch(
        postActions.getPostsRequest({
          userId: id as string,
          params: { page: nextPage, limit: LIMITS.POSTS },
        })
      );
    }
  }, [total, isIntersecting, router.query, nextPage, dispatch]);

  return (
    <div className={clsx('w-full lg:w-2/3')}>
      <NewsFeedSender />

      {posts.map((post) => {
        return <Post key={post._id} {...post} />;
      })}

      <div ref={loaderRef} />

      {loadings.includes(actions.getPosts) && (
        <>
          <LoadingPost />
          <LoadingPost />
        </>
      )}
    </div>
  );
}

export default WallContent;
