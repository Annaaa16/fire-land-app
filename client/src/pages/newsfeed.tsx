import { END } from '@redux-saga/core';

// types
import { SagaStore } from '@/redux/types';

import NewsFeed from '@/features/NewsFeed';

import { wrapper } from '@/redux/store';
import { getPosts } from '@/redux/actions/posts';
import { LIMIT_POSTS } from '@/constants';

function NewsFeedPage() {
  return <NewsFeed />;
}

export default NewsFeedPage;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(getPosts.request({ page: 1, limit: LIMIT_POSTS }));

    // End saga
    store.dispatch(END);

    await (store as SagaStore).sagaTask?.toPromise();

    return {
      props: {},
    };
  }
);
