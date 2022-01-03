// types
import { GetServerSideProps } from 'next';

// clsx
import clsx from 'clsx';

import { LIMITS } from '@/constants';
import { wrapper } from '@/redux/store';
import { postsApiServer } from '@/apis/postsApi';
import { postActions } from '@/redux/slices/postsSlice';
import { redirectToNotFound } from '@/helpers/server';

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

    try {
      const response = await getPosts({
        params: {
          page: 1,
          limit: LIMITS.POSTS,
        },
      });

      store.dispatch(postActions.getPostsSuccess(response));
    } catch (error) {
      return redirectToNotFound();
    }

    return {
      props: {},
    };
  });
