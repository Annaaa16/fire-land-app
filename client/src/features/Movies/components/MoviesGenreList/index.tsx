import { useState } from 'react';

// clsx
import clsx from 'clsx';

// material ui icons
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';

import { BREAKPOINTS } from '@/constants';

import MoviesCard from '../MoviesCard';

interface MoviesGenreList {
  title: string;
}

function MoviesGenreList({ title }: MoviesGenreList) {
  const [swiperConfig] = useState({
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
  });

  return (
    <section className={clsx('container')}>
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
              'font-bold text-base leading-none mr-0.5 uppercase',
              'transition-all duration-300 ease-out'
            )}>
            {title}
          </h2>
          <KeyboardArrowRightIcon />
        </div>
        <Swiper {...swiperConfig}>
          <SwiperSlide>
            <MoviesCard />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}

export default MoviesGenreList;
