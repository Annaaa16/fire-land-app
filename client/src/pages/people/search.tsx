// clsx
import clsx from 'clsx';

// types
import { GetServerSideProps } from 'next';

import { LIMITS } from '@/constants';
import { redirectToNotFound } from '@/helpers/server';
import { wrapper } from '@/redux/store';
import { usersApiServer } from '@/apis/usersApi';
import { userActions } from '@/redux/slices/usersSlice';

import Meta from '@/layouts/Meta';
import Social from '@/layouts/Social';
import PeopleList from '@/features/people/components/PeopleList';

interface PeopleProps {
  query: string;
}

function People({ query }: PeopleProps) {
  return (
    <Meta title={query ? query + ' - Search Results' : ''}>
      <Social>
        <div className={clsx('mx-auto w-full lg:w-3/4')}>
          <h2
            className={clsx(
              'font-bold text-lg flex px-4 py-5 shadow-md rounded-lg',
              'dark:text-white bg-white dark:bg-dk-cpn'
            )}>
            {query} - Search Results
          </h2>

          <PeopleList query={query} />
        </div>
      </Social>
    </Meta>
  );
}

export default People;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    const { q: query } = ctx.query;

    if (!query) return redirectToNotFound();

    const { searchPeople } = usersApiServer(ctx);

    store.dispatch(userActions.clearSearchedResults());

    try {
      const response = await searchPeople({
        q: query as string,
        limit: LIMITS.SEARCH_PEOPLE,
        page: 1,
      });

      store.dispatch(userActions.searchPeopleSuccess(response));
    } catch (error) {
      return redirectToNotFound();
    }

    return {
      props: {
        query,
      },
    };
  });
