// clsx
import clsx from 'clsx';

// types
import { GetServerSideProps } from 'next';
import { User } from '@/models/common';

import { LIMITS } from '@/constants';
import { postActions } from '@/redux/slices/postsSlice';
import { wrapper } from '@/redux/store';
import { postsApiServer } from '@/apis/postsApi';
import { userActions } from '@/redux/slices/usersSlice';
import { usersApiServer } from '@/apis/usersApi';
import { redirectToNotFound } from '@/helpers/server';

import Meta from '@/layouts/Meta';
import Social from '@/layouts/Social';
import WallCover from '@/features/wall/components/WallCover';
import WallWidgets from '@/features/wall/components/WallWidgets';
import WallContent from '@/features/wall/components/WallContent';

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

    store.dispatch(postActions.clearPosts());

    try {
      const userResponse = await getUser(id as string);

      if (!userResponse.success) return redirectToNotFound();

      const postsResponse = await getPosts({
        userId: id as string,
        params: { page: 1, limit: LIMITS.POSTS },
      });

      store.dispatch(userActions.setUserProfile(userResponse));
      store.dispatch(postActions.getPostsSuccess(postsResponse));

      return {
        props: {
          user: userResponse.user,
        },
      };
    } catch (error) {
      return redirectToNotFound();
    }
  });
