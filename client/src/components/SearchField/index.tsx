import { useState } from 'react';

// clsx
import clsx from 'clsx';

// material ui icons
import SearchIcon from '@mui/icons-material/Search';

// types
import { FormEvent } from 'react';

function SearchField() {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchTerm.trim()) return;
  };

  return (
    <form
      onSubmit={handleSubmit}
      role='search'
      className={clsx('container mb-4')}>
      <div
        className={clsx(
          'flex items-center',
          'bg-gradient-to-r from-gray-800 to-dk-body'
        )}>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search your favorite movie'
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

export default SearchField;
