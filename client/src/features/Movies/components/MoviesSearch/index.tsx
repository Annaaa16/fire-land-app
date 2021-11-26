import { useState } from 'react';
import { useRouter } from 'next/router';

// clsx
import clsx from 'clsx';

// material ui icons
import SearchIcon from '@mui/icons-material/Search';

// types
import { FormEvent } from 'react';

import { PATHS } from '@/constants';
import { moviesActions } from '@/redux/slices/moviesSlice';
import useStoreDispatch from '@/hooks/useStoreDispatch';

function MoviesSearch() {
  const [searchTerms, setSearchTerms] = useState<string>('');

  const router = useRouter();
  const dispatch = useStoreDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchTerms.trim()) return;

    dispatch(moviesActions.clearSearchedMovies());
    router.push(`${PATHS.MOVIES_SEARCH}?query=${searchTerms}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      role='search'
      className={clsx('container mb-8')}>
      <div
        className={clsx(
          'flex items-center',
          'bg-gradient-to-r from-gray-800 to-dk-body'
        )}>
        <input
          value={searchTerms}
          onChange={(e) => setSearchTerms(e.target.value)}
          placeholder='Search your favourite movie'
          className={clsx(
            'w-full px-3 py-3 outline-none',
            'text-gray-200 bg-transparent'
          )}
        />
        <button type='submit' className={clsx('px-4', 'cursor-pointer')}>
          <SearchIcon />
        </button>
      </div>
    </form>
  );
}

export default MoviesSearch;
