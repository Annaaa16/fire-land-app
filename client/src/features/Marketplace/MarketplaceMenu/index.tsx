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

import MenuItem from './MenuItem';

function MarketplaceMenu() {
  const menu = [
    { icon: DinnerDiningOutlinedIcon, title: 'Food' },
    { icon: SportsBarOutlinedIcon, title: 'Drinks' },
    { icon: VideogameAssetOutlinedIcon, title: 'Games' },
    { icon: SmartToyOutlinedIcon, title: 'Toys' },
    { icon: SportsSoccerOutlinedIcon, title: 'Sports' },
    { icon: PhonelinkOutlinedIcon, title: 'Entertainments' },
    { icon: TwoWheelerOutlinedIcon, title: 'Vehicles' },
    { icon: MenuBookOutlinedIcon, title: 'Comics' },
  ];

  return (
    <Swiper
      spaceBetween={35}
      slidesPerView='auto'
      className={clsx(
        'mt-10 !px-6 h-17 rounded-xl shadow-md',
        'bg-white dark:text-gray-300 dark:bg-dk-cpn'
      )}>
      {menu.map((item) => (
        <SwiperSlide
          key={item.title}
          className={clsx(
            'group flex items-center max-w-max',
            'cursor-pointer'
          )}>
          <MenuItem title={item.title} icon={item.icon} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default MarketplaceMenu;
