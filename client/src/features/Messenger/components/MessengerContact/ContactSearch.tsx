// clsx
import clsx from 'clsx';

// material ui icons
import SearchIcon from '@mui/icons-material/Search';

function ContactSearch() {
  return (
    <div
      className={clsx(
        'flex items-center rounded-full px-3',
        'bg-lt-input dark:text-white dark:bg-dk-input'
      )}>
      <input
        placeholder='Search Messenger'
        className={clsx('flex-1 outline-none px-2 py-3', 'bg-transparent')}
      />
      <SearchIcon className={clsx('text-gray-lt', 'cursor-pointer')} />
    </div>
  );
}

export default ContactSearch;
