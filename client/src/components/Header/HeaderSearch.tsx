// clsx
import clsx from 'clsx';

// material ui icons
import SearchIcon from '@mui/icons-material/Search';

function HeaderSearch() {
  return (
    <div
      className={clsx(
        'flex items-center flex-1 px-4 ml-2 md:mx-5 rounded-lg',
        'bg-primary-v1-input dark:bg-primary-v3-input'
      )}>
      <input
        className={clsx(
          'w-full outline-none py-3',
          'bg-transparent text-white text-xs lg:text-sm',
          'placeholder-primary-v1-text dark:placeholder-primary-v3-text'
        )}
        placeholder='Search here for people'
      />
      <SearchIcon className={clsx('text-primary-v1-text', 'cursor-pointer')} />
    </div>
  );
}

export default HeaderSearch;
