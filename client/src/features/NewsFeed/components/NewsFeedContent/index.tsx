import { useEffect, useRef } from 'react';

// clsx
import clsx from 'clsx';

import { LIMITS } from '@/constants';
import { usePostsSelector } from '@/redux/selectors';
import { postsActions } from '@/redux/slices/postsSlice';
import { actions } from '@/redux/slices/postsSlice';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useStoreDispatch from '@/hooks/useStoreDispatch';

import Post from '@/components/Post';
import LoadingPost from '@/components/Loading/LoadingPost';
import NewsFeedSender from '../NewsFeedSender';

function NewsFeedContent() {
  const loaderRef = useRef<HTMLDivElement>(null);

  const { nextPage, total, posts, loadings } = usePostsSelector();

  const dispatch = useStoreDispatch();

  const isIntersecting = useIntersectionObserver(loaderRef, '500px');

  // Get new posts when scrolled to bottom
  useEffect(() => {
    if (isIntersecting && nextPage && !loadings.includes(actions.getPosts)) {
      dispatch(
        postsActions.getPostsRequest({
          params: { page: nextPage, limit: LIMITS.POSTS },
        })
      );
    }
  }, [total, isIntersecting, nextPage, loadings, dispatch]);

  return (
    <div className={clsx('w-full lg:w-2/3 lg:mr-5')}>
      <NewsFeedSender />

      {posts.length > 0 &&
        posts.map((post) => <Post key={post._id} {...post} />)}

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

export default NewsFeedContent;
