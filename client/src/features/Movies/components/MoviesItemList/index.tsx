// clsx
import clsx from 'clsx';

// material ui icons
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';

// types
import { Movie } from '@/models/common';

import { BREAKPOINTS } from '@/constants';
import { tmdbCategories } from '@/configs/tmdb';

import MoviesItem from '../MoviesItem';

interface MoviesItemListProps {
  title: string;
  items: Movie[];
  category: keyof typeof tmdbCategories;
}

function MoviesItemList({ title, items, category }: MoviesItemListProps) {
  const swiperConfig = {
    breakpoints: {
      [BREAKPOINTS.PHONE]: {
        slidesPerView: 1.4,
        spaceBetween: 8,
      },
      [BREAKPOINTS.TABLET]: {
        slidesPerView: 3.4,
        spaceBetween: 8,
      },
      [BREAKPOINTS.DESKTOP]: {
        slidesPerView: 5.8,
        spaceBetween: 8,
      },
    },
  };

  return (
    <>
      {items.length > 0 && (
        <section className={clsx('container mb-14')}>
          <div className={clsx('mb-6')}>
            <div
              className={clsx(
                'inline-flex items-center mb-3',
                'text-white',
                'cursor-pointer',
                'hover:text-primary-v4-hv'
              )}>
              <h2
                className={clsx(
                  'font-semibold text-base leading-none mr-0.5 uppercase',
                  'transition-all duration-300 ease-out'
                )}>
                {title}
              </h2>
              <KeyboardArrowRightIcon />
            </div>
            <Swiper {...swiperConfig}>
              {items.map(
                (item) =>
                  item.image && (
                    <SwiperSlide key={item.id}>
                      <MoviesItem movie={item} category={category} />
                    </SwiperSlide>
                  )
              )}
            </Swiper>
          </div>
        </section>
      )}
    </>
  );
}

export default MoviesItemList;
