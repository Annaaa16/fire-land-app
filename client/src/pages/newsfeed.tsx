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

import NewsFeed from '@/features/NewsFeed';
import cookies from '@/helpers/cookies';

interface NewsFeedPageProps {
  accessToken: string;
}

export default function NewsFeedPage({ accessToken }: NewsFeedPageProps) {
  cookies.setAccessToken(accessToken);

  return <NewsFeed />;
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const refreshToken = context.req.cookies.REFRESH_TOKEN;

    // Redirect to login when token has expired
    if (!refreshToken) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    const { reqGetCurrentUser } = authApiServer(context);
    const { data: userData, accessToken }: any = await reqGetCurrentUser();

    store.dispatch(setUser(userData));

    // Send new token when got from request get user
    const { reqGetPosts } = postsApiServer('', context);
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
