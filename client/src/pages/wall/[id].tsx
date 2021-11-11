import { useEffect } from 'react';
import { useRouter } from 'next/router';

// clsx
import clsx from 'clsx';

// types
import { GetServerSideProps } from 'next';
import { AxiosResponse } from 'axios';
import { GetPostsResponse } from '@/models/posts';
import { GetUserResponse } from '@/models/users';

import { LIMITS } from '@/constants';
import { addFetchedPosts, clearPosts } from '@/redux/slices/postsSlice';
import { wrapper } from '@/redux/store';
import { postsApiServer } from '@/apis/postsApi';
import { getUserFriends } from '@/redux/actions/users';
import { setUserProfile } from '@/redux/slices/usersSlice';
import { usersApiServer } from '@/apis/usersApi';
import tokens from '@/helpers/tokens';
import useStoreDispatch from '@/hooks/useStoreDispatch';

import Meta from '@/layouts/Meta';
import CenterContent from '@/layouts/CenterContent';
import WallCover from '@/features/Wall/components/WallCover';
import WallWidgets from '@/features/Wall/components/WallWidgets';
import WallContent from '@/features/Wall/components/WallContent';

function Wall() {
  const router = useRouter();

  const dispatch = useStoreDispatch();

  // Fetch init user's friends
  useEffect(() => {
    const { id } = router.query;

    // Block first load ID is undefined
    if (id) {
      dispatch(
        getUserFriends.request({
          userId: id as string,
          params: { page: 1, limit: 10 },
        })
      );
    }
  }, [router.query, dispatch]);

  return (
    <Meta title='Wall'>
      <CenterContent>
        <WallCover />
        <section className={clsx('flex mt-7')}>
          <WallWidgets />
          <WallContent />
        </section>
      </CenterContent>
    </Meta>
  );
}

export default Wall;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    const { id } = ctx.query;
    const { getPosts } = postsApiServer(ctx);
    const { getUser } = usersApiServer(ctx);
    const { isRefreshTokenExpired, isFully } = tokens.checkTokenValid(ctx)!;

    if (isFully && !isRefreshTokenExpired) {
      store.dispatch(clearPosts());

      const postsResponse = (await getPosts({
        user_id: id as string,
        page: 1,
        limit: LIMITS.POSTS,
      })) as AxiosResponse<GetPostsResponse>;

      const userResponse = (await getUser(
        id as string
      )) as AxiosResponse<GetUserResponse>;

      postsResponse && store.dispatch(addFetchedPosts(postsResponse.data));
      userResponse && store.dispatch(setUserProfile(userResponse.data));
    }

    return {
      props: {},
    };
  });
