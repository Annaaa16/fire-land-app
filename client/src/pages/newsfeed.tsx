import { END } from '@redux-saga/core';

// types
import { SagaStore } from '@/redux/types';
import { GetServerSideProps } from 'next';

import { LIMIT_POSTS } from '@/constants';
import { wrapper } from '@/redux/store';
import { setUser } from '@/redux/slices/authSlice';
import { authApiServer } from '@/apis/authApi';
import { postsApiServer } from '@/apis/postsApi';
import { addFetchedPostList } from '@/redux/slices/postsSlice';
import cookies from '@/helpers/cookies';

import NewsFeed from '@/features/NewsFeed';

interface NewsFeedPageProps {
  accessToken: string;
}

function NewsFeedPage({ accessToken }: NewsFeedPageProps) {
  cookies.setAccessToken(accessToken);

  return <NewsFeed />;
}

export default NewsFeedPage;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    const { reqGetCurrentUser } = authApiServer(ctx);
    const { data: userData, accessToken }: any = await reqGetCurrentUser();

    store.dispatch(setUser(userData));

    // Send new token when got from request get user
    const { reqGetPosts } = postsApiServer('', ctx);
    const { data: postsData }: any = await reqGetPosts({
      page: 1,
      limit: LIMIT_POSTS,
    });

    store.dispatch(addFetchedPostList(postsData));

    // End saga
    store.dispatch(END);

    await (store as SagaStore).sagaTask?.toPromise();

    return {
      props: {
        accessToken,
      },
    };
  });
