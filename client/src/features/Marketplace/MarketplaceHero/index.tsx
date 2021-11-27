// clsx
import clsx from 'clsx';

// material ui icons
import BuildIcon from '@mui/icons-material/Build';
import StoreIcon from '@mui/icons-material/Store';
import GroupsIcon from '@mui/icons-material/Groups';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from '@/components/Image';

// images
import {
  heroOne,
  heroTwo,
  heroThree,
  heroFour,
  heroFive,
} from '@/utils/cloudinaryImages';

function MarketplaceHero() {
  const heros = [
    { thumbnail: heroOne, title: "Let's create your own product!" },
    { thumbnail: heroTwo, title: 'Build interesting things' },
    { thumbnail: heroThree, title: 'Be the first to build your own store' },
    { thumbnail: heroFour, title: 'Where to look for quality products?' },
    { thumbnail: heroFive, title: 'Develope a strong community' },
  ];

  const swiperConfig = {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 20,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  };

  return (
    <section className={clsx('flex h-100')}>
      <Swiper
        {...swiperConfig}
        className='h-full lg:w-2/3 rounded-lg overflow-hidden'>
        {heros.map((hero) => (
          <SwiperSlide key={hero.thumbnail} className='h-full'>
            <div
              className={clsx('relative', 'h-full rounded-lg overflow-hidden')}>
              <Image
                src={hero.thumbnail}
                layout='fill'
                alt='Intro'
                objectFit='cover'
                priority={true}
                styleLoading='cover'
              />
              <div className={clsx('absolute top-50 left-6 z-1')}>
                <h1
                  className={clsx(
                    'text-2xl md:text-4xl font-bold mb-5 leading-tight',
                    'text-white'
                  )}>
                  {hero.title}
                </h1>
                <button
                  className={clsx(
                    'btn px-6 md:px-8 py-1.5 md:py-2 text-sm-1 md:text-sm'
                  )}>
                  Create
                </button>
              </div>

              <div
                className={clsx(
                  'absolute inset-0',
                  'bg-gradient-to-t from-gray-900 to-transparent'
                )}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className={clsx(
          'hidden lg:flex flex-col justify-center px-4 py-5 rounded-lg md:w-1/3 md:ml-4 shadow-md',
          'bg-white dark:bg-dk-cpn'
        )}>
        <h2 className={clsx('mb-5 text-lg font-bold', 'dark:text-white')}>
          Outstanding Features
        </h2>
        <ul>
          <li
            className={clsx(
              'flex items-center px-3 py-4 rounded-md mb-3',
              'bg-gray-200 dark:text-white dark:bg-gray-700'
            )}>
            <BuildIcon className={clsx('mr-2', 'text-red-400')} />
            <span>Build your own products fastly</span>
          </li>
          <li
            className={clsx(
              'flex items-center px-3 py-4 rounded-md mb-3',
              'bg-gray-200 dark:text-white dark:bg-gray-700'
            )}>
            <StoreIcon className={clsx('mr-2', 'text-purple-500')} />
            <span>Rich shopping</span>
          </li>
          <li
            className={clsx(
              'flex items-center px-3 py-4 rounded-md mb-3',
              'bg-gray-200 dark:text-white dark:bg-gray-700'
            )}>
            <SportsEsportsIcon className={clsx('mr-2', 'text-yellow-500')} />
            <span>Share orders with your friends</span>
          </li>
          <li
            className={clsx(
              'flex items-center px-3 py-4 rounded-md mb-3',
              'bg-gray-200 dark:text-white dark:bg-gray-700'
            )}>
            <LocalShippingIcon className={clsx('mr-2', 'text-blue-500')} />
            <span>Easy shipping</span>
          </li>
          <li
            className={clsx(
              'flex items-center px-3 py-4 rounded-md',
              'bg-gray-200 dark:text-white dark:bg-gray-700'
            )}>
            <GroupsIcon className={clsx('mr-2', 'text-green-500')} />
            <span>Friendly Creators</span>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default MarketplaceHero;
