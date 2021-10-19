// nookies
import { parseCookies } from 'nookies';

// types
import { AxiosResponse } from 'axios';
import { GetServerSideProps } from 'next';
import { GetPostsResponse } from '@/models/posts';
import { GetTokenResponse } from '@/models/auth';
import { SuccessResponse } from '@/models/common';

import { LIMIT_POSTS } from '@/constants';
import { wrapper } from '@/redux/store';
import { postsApiServer } from '@/apis/postsApi';
import { addFetchedPostList } from '@/redux/slices/postsSlice';
import { authApiServer } from '@/apis/authApi';
import token from '@/helpers/token';
import cookies from '@/helpers/cookies';

import NewsFeed from '@/features/NewsFeed';

interface NewsFeedPageProps {
  accessToken: string;
}

function NewsFeedPage({ accessToken }: NewsFeedPageProps) {
  accessToken && cookies.setAccessToken(accessToken);

  return <NewsFeed />;
}

export default NewsFeedPage;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    const { access_token, refresh_token } = parseCookies(ctx);
    let newToken;

    if (access_token && refresh_token) {
      const { verifyToken, getToken } = authApiServer(access_token);
      const isExpired = token.verifyToken(access_token);

      const {
        data: { success },
      } = (await verifyToken(access_token)) as AxiosResponse<SuccessResponse>;

      // Token have not expired yet
      if (!success && !isExpired!) {
        const { data } = (await getToken(
          refresh_token
        )) as AxiosResponse<GetTokenResponse>;

        newToken = data.accessToken;
      }

      const { getPosts } = postsApiServer(newToken || access_token);

      const response = (await getPosts({
        page: 1,
        limit: LIMIT_POSTS,
      })) as AxiosResponse<GetPostsResponse>;

      store.dispatch(addFetchedPostList(response.data));
    }

    return {
      props: {
        accessToken: newToken || '',
      },
    };
  });
