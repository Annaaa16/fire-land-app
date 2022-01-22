import { useEffect, useRef } from 'react';

import { LIMITS } from '@/constants';
import { useUsersSelector } from '@/redux/selectors';
import { userActions } from '@/redux/slices/usersSlice';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useStoreDispatch from '@/hooks/useStoreDispatch';

import PeopleItem from '../PeopleItem';
import PeopleNotMatch from '../PeopleNotMatch';

interface PeopleListProps {
  query: string;
}

function PeopleList({ query }: PeopleListProps) {
  const {
    searchedUsers: { users, nextPage },
  } = useUsersSelector();

  const loaderRef = useRef<HTMLDivElement>(null);

  const dispatch = useStoreDispatch();
  const isIntersecting = useIntersectionObserver(loaderRef, '500px');

  useEffect(() => {
    if (isIntersecting && nextPage && query) {
      dispatch(
        userActions.searchPeopleRequest({
          q: query,
          limit: LIMITS.SEARCH_PEOPLE,
          page: nextPage,
        })
      );
    }
  }, [isIntersecting, nextPage, query, dispatch]);

  if (users.length === 0) return <PeopleNotMatch />;

  return (
    <ul className='mt-6 space-y-5'>
      {users.map((user) => (
        <PeopleItem key={user._id} {...user} />
      ))}

      <div ref={loaderRef} />
    </ul>
  );
}

export default PeopleList;
