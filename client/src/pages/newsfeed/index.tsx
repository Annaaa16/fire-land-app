// nookies
import { parseCookies } from 'nookies';

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
import { addFetchedPostList } from '@/redux/slices/postsSlice';

import Meta from '@/layouts/Meta';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import SidebarSmall from '@/components/SidebarSmall';
import NewsFeedBanner from '@/features/NewsFeed/components/NewsFeedBanner';
import NewsFeedMembers from '@/features/NewsFeed/components/NewsFeedSummary';
import NewsFeedContent from '@/features/NewsFeed/components/NewsFeedContent';
import NewsFeedWidgets from '@/features/NewsFeed/components/NewsFeedWidgets';
import tokens from '@/helpers/tokens';

function NewsFeed() {
  return (
    <Meta title='News Feed'>
      <Header />
      {/* <Sidebar /> */}
      <SidebarSmall />

      <main className={clsx('mt-[64px]', 'bg-lt-body dark:bg-dk-body')}>
        <div className={clsx('lg:w-[1184px] px-4 lg:px-0 mx-auto py-10')}>
          <NewsFeedBanner />
          <NewsFeedMembers />

          <section
            className={clsx(
              'grid grid-cols-1 lg:grid-cols-3 gap-5 justify-between mt-7'
            )}>
            <NewsFeedContent />
            <NewsFeedWidgets />
          </section>
        </div>
      </main>
    </Meta>
  );
}

export default NewsFeed;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    const { getPosts } = postsApiServer(ctx);
    const { isRefreshTokenExpired, isFully } = tokens.checkTokenValid(ctx)!;

    if (isFully && !isRefreshTokenExpired) {
      const response = (await getPosts({
        page: 1,
        limit: LIMITS.POSTS,
      })) as AxiosResponse<GetPostsResponse>;

      store.dispatch(addFetchedPostList(response.data));
    }

    return {
      props: {},
    };
  });
