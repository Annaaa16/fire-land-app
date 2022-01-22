import { useState } from 'react';
import { useRouter } from 'next/router';

// types
import { FormEvent } from 'react';

// clsx
import clsx from 'clsx';

// material ui icons
import SearchIcon from '@mui/icons-material/Search';

import { PATHS } from '@/constants';

function HeaderMiddle() {
  const [searchTerms, setSearchTerms] = useState<string>('');

  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchTerms.trim()) return;

    router.push({ pathname: PATHS.PEOPLE_SEARCH, query: { q: searchTerms } });
    setSearchTerms('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(
        'flex items-center flex-grow lg:flex-grow-[0.9] pl-6 pr-4 ml-2 md:mx-5 rounded-full',
        'bg-primary-v1-input dark:bg-primary-v3-input'
      )}>
      <input
        value={searchTerms}
        onChange={(e) => setSearchTerms(e.target.value)}
        className={clsx(
          'w-full outline-none py-3',
          'bg-transparent text-white text-xs lg:text-sm',
          'placeholder-primary-v1-txt dark:placeholder-primary-v3-text'
        )}
        placeholder='Search here for people'
      />
      <button type='submit'>
        <SearchIcon className={clsx('text-primary-v1-txt', 'cursor-pointer')} />
      </button>
    </form>
  );
}

export default HeaderMiddle;
