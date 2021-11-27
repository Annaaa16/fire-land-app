// clsx
import clsx from 'clsx';

// material ui icons
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChatIcon from '@mui/icons-material/Chat';
import GroupsIcon from '@mui/icons-material/Groups';
import StoreIcon from '@mui/icons-material/Store';

import Switch from '@/components/Switch';

function MarketplaceFilters() {
  return (
    <div className='flex items-center justify-center md:justify-end flex-wrap gap-y-4 gap-x-2 md:gap-y-0'>
      <Switch id='toggleOne' className='mr-3'>
        <span className={clsx('text-sm-1', 'dark:text-white')}>
          Low to High
        </span>
      </Switch>
      <Switch id='toggleTwo' className='mr-3'>
        <span className={clsx('text-sm-1', 'dark:text-white')}>
          High to Low
        </span>
      </Switch>

      <div
        className={clsx(
          'relative',
          'group flex-between min-w-[100px] py-1.5 px-3 rounded-lg font-semibold',
          'bg-gray-200 dark:bg-dk-input',
          'transition-all duration-200 ease-out',
          'cursor-pointer',
          'hover:bg-gray-300'
        )}>
        <span className={clsx('mr-0.5 text-sm-1', 'dark:text-gray-200')}>
          Sort
        </span>
        <KeyboardArrowDownIcon className='dark:text-gray-200' />
        <ul
          className={clsx(
            'absolute right-1/2 md:right-0 top-[125%] z-10',
            'min-w-[150%] shadow-2xl rounded-lg py-2 scale-75 translate-x-1/2 md:translate-x-0 md:origin-top-right opacity-0 invisible',
            'bg-white dark:bg-dk-cpn',
            'transition-all ease-out',
            'pointer-events-none',
            'group-hover:opacity-100 group-hover:visible group-hover:scale-100 group-hover:pointer-events-auto'
          )}>
          <li
            className={clsx(
              'group flex items-center px-3 py-2 min-w-max',
              'text-gray-500 dark:text-gray-200',
              'transition-all duration-75 ease-out',
              'lg:hover:bg-primary-v2 lg:dark:hover:bg-primary-v4-hv lg:hover:text-white'
            )}>
            <FavoriteOutlinedIcon
              className={clsx('mr-2 !text-xl', '!transition-none')}
            />
            <span className={clsx('text-sm-1')}>Favourites</span>
          </li>
          <li
            className={clsx(
              'group flex items-center px-3 py-2 min-w-max',
              'text-gray-500 dark:text-gray-200',
              'transition-all duration-75 ease-out',
              'lg:hover:bg-primary-v2 lg:dark:hover:bg-primary-v4-hv lg:hover:text-white'
            )}>
            <ChatIcon className={clsx('mr-2 !text-xl', '!transition-none')} />
            <span className={clsx('text-sm-1')}>Comments</span>
          </li>
          <li
            className={clsx(
              'group flex items-center px-3 py-2 min-w-max',
              'text-gray-500 dark:text-gray-200',
              'transition-all duration-75 ease-out',
              'lg:hover:bg-primary-v2 lg:dark:hover:bg-primary-v4-hv lg:hover:text-white'
            )}>
            <GroupsIcon className={clsx('mr-2 !text-xl', '!transition-none')} />
            <span className={clsx('text-sm-1')}>Members</span>
          </li>
          <li
            className={clsx(
              'group flex items-center px-3 py-2 min-w-max',
              'text-gray-500 dark:text-gray-200',
              'transition-all duration-75 ease-out',
              'lg:hover:bg-primary-v2 lg:dark:hover:bg-primary-v4-hv lg:hover:text-white'
            )}>
            <StoreIcon className={clsx('mr-2 !text-xl', '!transition-none')} />
            <span className={clsx('text-sm-1')}>Sold</span>
          </li>

          <li
            className={clsx(
              'absolute -top-4 left-0 -z-1',
              'h-10 w-full',
              'bg-transparent'
            )}
          />
        </ul>
      </div>
    </div>
  );
}

export default MarketplaceFilters;
