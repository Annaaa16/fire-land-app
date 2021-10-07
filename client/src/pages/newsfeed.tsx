// types
import { GetServerSideProps } from 'next';
import { GetPostsResponse } from '@/models/posts';
import { LoginResponse } from '@/models/login';
import { ErrorResponse } from '@/models/common';

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

    const { data: userData, accessToken } = (await reqGetCurrentUser()) as {
      data: LoginResponse | ErrorResponse;
      accessToken: string;
    };

    store.dispatch(setUser(userData as LoginResponse));

    // Send new token when got from request get user
    const { reqGetPosts } = postsApiServer('', ctx);

    const { data: postsData } = (await reqGetPosts({
      page: 1,
      limit: LIMIT_POSTS,
    })) as { data: GetPostsResponse };

    store.dispatch(addFetchedPostList(postsData));

    return {
      props: {
        accessToken,
      },
    };
  });
