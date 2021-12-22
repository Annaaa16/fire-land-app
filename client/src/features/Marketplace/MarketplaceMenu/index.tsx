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

function MarketplaceMenu() {
  return (
    <Swiper
      spaceBetween={35}
      slidesPerView='auto'
      className={clsx(
        'mt-10 !px-6 h-17 rounded-xl shadow-md',
        'bg-white dark:text-gray-300 dark:bg-dk-cpn'
      )}>
      {menu.map(({ icon: Icon, title }) => (
        <SwiperSlide
          key={title}
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
