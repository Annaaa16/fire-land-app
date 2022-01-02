import { useRouter } from 'next/router';

// clsx
import clsx from 'clsx';

// material ui icons
import DinnerDiningOutlinedIcon from '@mui/icons-material/DinnerDiningOutlined';
import SportsBarOutlinedIcon from '@mui/icons-material/SportsBarOutlined';
import VideogameAssetOutlinedIcon from '@mui/icons-material/VideogameAssetOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import SportsSoccerOutlinedIcon from '@mui/icons-material/SportsSoccerOutlined';
import PhonelinkOutlinedIcon from '@mui/icons-material/PhonelinkOutlined';
import TwoWheelerOutlinedIcon from '@mui/icons-material/TwoWheelerOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';

// types
import { ProductCategories } from '@/models/products';

import { PATHS } from '@/constants';

const menu: Array<{
  icon: any;
  title: string;
  query: keyof ProductCategories;
}> = [
  { icon: DinnerDiningOutlinedIcon, title: 'Food', query: 'food' },
  { icon: SportsBarOutlinedIcon, title: 'Drinks', query: 'drinks' },
  { icon: VideogameAssetOutlinedIcon, title: 'Games', query: 'games' },
  { icon: SmartToyOutlinedIcon, title: 'Toys', query: 'toys' },
  { icon: SportsSoccerOutlinedIcon, title: 'Sports', query: 'sports' },
  {
    icon: PhonelinkOutlinedIcon,
    title: 'Entertainments',
    query: 'entertainments',
  },
  { icon: TwoWheelerOutlinedIcon, title: 'Vehicles', query: 'vehicles' },
  { icon: MenuBookOutlinedIcon, title: 'Comics', query: 'comics' },
];

function MarketplaceMenu() {
  const router = useRouter();

  const handleNavigate = (query: keyof ProductCategories) => {
    router.push({
      pathname: PATHS.MARKETPLACE_PRODUCTS,
      query: { category: query },
    });
  };

  return (
    <Swiper
      spaceBetween={35}
      slidesPerView='auto'
      className={clsx(
        'mt-10 !px-6 h-17 rounded-xl shadow-md',
        'bg-white dark:text-gray-300 dark:bg-dk-cpn'
      )}>
      {menu.map(({ icon: Icon, title, query }) => (
        <SwiperSlide
          key={title}
          onClick={() => handleNavigate(query)}
          className={clsx(
            'group flex items-center max-w-max',
            'cursor-pointer'
          )}>
          <div className={clsx('group flex items-center', 'cursor-pointer')}>
            <Icon
              className={clsx(
                'mr-1.5 !text-2xl',
                'lg:group-hover:text-primary-v1-hv lg:dark:group-hover:text-primary-v4-hv'
              )}
            />
            <span
              className={clsx(
                'text-sm-1 font-semibold',
                'transition-all duration-250 ease-out',
                'lg:group-hover:text-primary-v1-hv lg:dark:group-hover:text-primary-v4-hv'
              )}>
              {title}
            </span>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default MarketplaceMenu;
