import { useEffect, useRef, useState } from 'react';

// clsx
import clsx from 'clsx';

// material ui icons
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChatIcon from '@mui/icons-material/Chat';
import GroupsIcon from '@mui/icons-material/Groups';
import SellIcon from '@mui/icons-material/Sell';
import StoreIcon from '@mui/icons-material/Store';

// headless ui
import { Transition } from '@headlessui/react';

// types
import {
  GetProductsParams as Params,
  ProductCategories,
} from '@/models/products';

import { PATHS } from '@/constants';
import { useRouter } from 'next/router';

import Switch from '@/components/Switch';
import useEventListener from '@/hooks/useEventListener';
import useClickOutside from '@/hooks/useClickOutside';

interface MarketplaceFiltersProps {
  category: keyof ProductCategories;
}

const filterOptions: Array<{
  name: string;
  icon: any;
  sort: Params['sort'];
}> = [
  {
    name: 'Price',
    icon: SellIcon,
    sort: 'price',
  },
  {
    name: 'Favourites',
    icon: FavoriteOutlinedIcon,
    sort: 'reactions',
  },
  {
    name: 'Comments',
    icon: ChatIcon,
    sort: 'comments',
  },
  {
    name: 'Members',
    icon: GroupsIcon,
    sort: 'members',
  },
  {
    name: 'Sold',
    icon: StoreIcon,
    sort: 'sold',
  },
];

function MarketplaceFilters({ category }: MarketplaceFiltersProps) {
  const [order, setOrder] = useState<Params['order']>();
  const [isOpenFilters, setIsOpenFilters] = useState<boolean>(false);

  const hoverRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const { order: orderQuery, sort } = router.query;

  const handleFilterProducts = (sort: Params['sort']) => {
    router.push({
      pathname: PATHS.MARKETPLACE_PRODUCTS,
      query: { category, order: order || 'asc', sort },
    });
    setIsOpenFilters(false);
  };

  const handleToggleSwitch = (selectedOrder: Params['order']) => {
    setOrder(selectedOrder === order ? undefined : selectedOrder);
  };

  useEffect(() => {
    setOrder(orderQuery as Params['order']);
  }, [orderQuery, router]);

  useEventListener('mousemove', () => setIsOpenFilters(true), hoverRef);
  useEventListener('mouseleave', () => setIsOpenFilters(false), hoverRef);
  useEventListener('touchstart', () => setIsOpenFilters(true), hoverRef);
  useClickOutside(hoverRef, () => setIsOpenFilters(false));

  return (
    <div className='flex items-center justify-center md:justify-end flex-wrap gap-y-4 gap-x-2 md:gap-y-0'>
      <Switch
        checked={order === 'asc'}
        onClick={() => handleToggleSwitch('asc')}
        className='mr-3'>
        <span className={clsx('text-sm-1', 'dark:text-white')}>
          Low to High
        </span>
      </Switch>
      <Switch
        checked={order === 'desc'}
        onClick={() => handleToggleSwitch('desc')}
        className='mr-3'>
        <span className={clsx('text-sm-1', 'dark:text-white')}>
          High to Low
        </span>
      </Switch>

      <div
        ref={hoverRef}
        className={clsx(
          'relative',
          'group flex-between w-32 py-2 pl-4 pr-3.5 rounded-lg font-semibold',
          'bg-gray-200 dark:bg-dk-input',
          'transition-all duration-200 ease-out',
          'cursor-pointer',
          'hover:bg-gray-300'
        )}>
        <span
          className={clsx('mr-0.5 text-sm-1 capitalize', 'dark:text-gray-200')}>
          {sort === 'reactions' ? 'favourites' : sort || 'Sort'}
        </span>
        <KeyboardArrowDownIcon className='dark:text-gray-200' />
        <Transition
          show={isOpenFilters}
          enter={clsx('transition-all ease-out', 'pointer-events-none')}
          enterFrom={clsx('scale-75', 'pointer-events-none')}
          enterTo={clsx('scale-100', 'pointer-events-auto')}
          leave={clsx('transition-all ease-out', 'pointer-events-none')}
          leaveFrom={clsx('opacity-100 scale-100', 'pointer-events-none')}
          leaveTo={clsx('opacity-0 scale-75', 'pointer-events-none')}
          className={clsx(
            'absolute right-1/2 md:right-0 top-[125%] z-10',
            'w-48 shadow-box rounded-lg py-2 translate-x-1/2 md:translate-x-0 md:origin-top-right',
            'bg-white dark:bg-dk-cpn'
          )}>
          {filterOptions.map(({ name, icon: Icon, sort }, idx) => (
            <div
              onClick={() => handleFilterProducts(sort)}
              key={name + idx}
              className={clsx(
                'group flex items-center px-3 py-2.5 min-w-max',
                'text-gray-500 dark:text-gray-200',
                'lg:hover:bg-primary-v1 lg:dark:hover:bg-primary-v4-hv lg:hover:text-white'
              )}>
              <Icon className={clsx('mr-2 !text-xl', '!transition-none')} />
              <span className={clsx('text-sm-1')}>{name}</span>
            </div>
          ))}

          <div
            className={clsx(
              'absolute -top-4 left-0 -z-1',
              'h-10 w-full',
              'bg-transparent'
            )}
          />
        </Transition>
      </div>
    </div>
  );
}

export default MarketplaceFilters;
