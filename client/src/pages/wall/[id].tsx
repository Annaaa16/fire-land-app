// clsx
import clsx from 'clsx';

// types
import { GetServerSideProps } from 'next';
import { AxiosResponse } from 'axios';
import { GetPostsResponse } from '@/models/posts';
import { GetUserResponse } from '@/models/users';
import { User } from '@/models/common';

import { LIMITS, STATUS_CODES } from '@/constants';
import { postsActions } from '@/redux/slices/postsSlice';
import { wrapper } from '@/redux/store';
import { postsApiServer } from '@/apis/postsApi';
import { usersActions } from '@/redux/slices/usersSlice';
import { usersApiServer } from '@/apis/usersApi';
import { notifyPageError } from '@/helpers/notifyError';
import tokens from '@/helpers/tokens';

import Meta from '@/layouts/Meta';
import Social from '@/layouts/Social';
import WallCover from '@/features/Wall/components/WallCover';
import WallWidgets from '@/features/Wall/components/WallWidgets';
import WallContent from '@/features/Wall/components/WallContent';

interface WallProps {
  user: User;
}

function Wall({ user }: WallProps) {
  return (
    <Meta title={user ? user.username : 'Not Found'}>
      <Social>
        <WallCover />
        <section className={clsx('flex mt-7')}>
          <WallWidgets />
          <WallContent />
        </section>
      </Social>
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

    let user: User | null = null;
    let statusCode: number = STATUS_CODES.DEFAULT;

    if (isFully && !isRefreshTokenExpired) {
      store.dispatch(postsActions.clearPosts());

      try {
        const userResponse = (await getUser(
          id as string
        )) as AxiosResponse<GetUserResponse>;

        if (userResponse?.data.success) {
          const postsResponse = (await getPosts({
            user_id: id as string,
            page: 1,
            limit: LIMITS.POSTS,
          })) as AxiosResponse<GetPostsResponse>;

          store.dispatch(usersActions.setUserProfile(userResponse.data));
          postsResponse &&
            store.dispatch(postsActions.getPostsSuccess(postsResponse.data));

          user = userResponse.data.user;
        }

        statusCode = userResponse.status;
      } catch (error) {
        statusCode = STATUS_CODES.SERVER_ERROR;
        notifyPageError('Wall', error);
      }
    }

    if (statusCode >= 400) {
      return {
        notFound: true,
      };
    } else {
      return {
        props: {
          user,
        },
      };
    }
  });
