// clsx
import clsx from 'clsx';

// material ui icons
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';

// types
import { Movie } from '@/models/common';
import { TmdbCategories } from '@/models/tmdb';

import { BREAKPOINTS } from '@/constants';
import { useMoviesContext } from '@/contexts/MoviesContext';

import MoviesItem from '../MoviesItem';

interface MoviesItemListProps {
  title: string;
  items: Movie[];
  category: keyof TmdbCategories;
}

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

function MoviesItemList({ title, items, category }: MoviesItemListProps) {
  const { clearTimer } = useMoviesContext();

  if (items.length <= 0) return null;

  return (
    <section
      data-movies-container
      className={clsx('relative', 'container mb-14')}>
      <div
        className={clsx(
          'relative',
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

      <Swiper {...swiperConfig} onSliderMove={clearTimer}>
        {items.map(
          (item) =>
            item.image && (
              <SwiperSlide key={item.id}>
                <MoviesItem movie={item} category={category} />
              </SwiperSlide>
            )
        )}
      </Swiper>
    </section>
  );
}

export default MoviesItemList;
