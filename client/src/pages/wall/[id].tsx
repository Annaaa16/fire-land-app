// clsx
import clsx from 'clsx';

// types
import { GetServerSideProps } from 'next';

// types
import { AxiosResponse } from 'axios';
import { GetPostsResponse } from '@/models/posts';

import { LIMITS } from '@/constants';
import { wrapper } from '@/redux/store';
import { postsApiServer } from '@/apis/postsApi';
import { addFetchedPostList } from '@/redux/slices/postsSlice';
import tokens from '@/helpers/tokens';

import Meta from '@/layouts/Meta';
import CenterContent from '@/layouts/CenterContent';
import Header from '@/components/Header';
import WallCover from '@/features/Wall/components/WallCover';
import WallWidgets from '@/features/Wall/components/WallWidgets';
import WallContent from '@/features/Wall/components/WallContent';

function Wall() {
  return (
    <>
      <Header />
      <Meta title='Wall'>
        <CenterContent>
          <WallCover />
          <section className={clsx('flex mt-7')}>
            <WallWidgets />
            <WallContent />
          </section>
        </CenterContent>
      </Meta>
    </>
  );
}

export default Wall;

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
