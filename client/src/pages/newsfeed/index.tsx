// types
import { GetServerSideProps } from 'next';

// clsx
import clsx from 'clsx';

// types
import { AxiosResponse } from 'axios';
import { GetPostsResponse } from '@/models/posts';

import { LIMITS } from '@/constants';
import { wrapper } from '@/redux/store';
import { postsApiServer } from '@/apis/postsApi';
import { postActions } from '@/redux/slices/postsSlice';
import Meta from '@/layouts/Meta';
import Social from '@/layouts/Social';
import NewsFeedBanner from '@/features/NewsFeed/components/NewsFeedBanner';
import NewsFeedMembers from '@/features/NewsFeed/components/NewsFeedSummary';
import NewsFeedContent from '@/features/NewsFeed/components/NewsFeedContent';
import NewsFeedWidgets from '@/features/NewsFeed/components/NewsFeedWidgets';

function NewsFeed() {
  return (
    <Meta title='News Feed'>
      <Social>
        <NewsFeedBanner />
        <NewsFeedMembers />

        <section className={clsx('flex justify-between mt-7')}>
          <NewsFeedContent />
          <NewsFeedWidgets />
        </section>
      </Social>
    </Meta>
  );
}

export default NewsFeed;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    const { getPosts } = postsApiServer(ctx);

    const response = (await getPosts({
      params: {
        page: 1,
        limit: LIMITS.POSTS,
      },
    })) as AxiosResponse<GetPostsResponse>;

    response && store.dispatch(postActions.getPostsSuccess(response.data));

    return {
      props: {},
    };
  });
