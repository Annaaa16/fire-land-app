import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

// clsx
import clsx from 'clsx';

// material ui icons
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';

// types
import { Movie } from '@/models/common';

import { BREAKPOINTS, PATHS } from '@/constants';
import tmdb from '@/configs/tmdb';

interface MoviesGenreList {
  title: string;
  movies: Movie[];
}

function MoviesGenreList({ title, movies }: MoviesGenreList) {
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

  const router = useRouter();

  const moveToDetail = (id: string) => {
    router.push({ pathname: PATHS.MOVIES_DETAIL, query: { id: id } });
  };

  return (
    <>
      {movies.length > 0 && (
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
                  'font-bold text-base leading-none mr-0.5 uppercase',
                  'transition-all duration-300 ease-out'
                )}>
                {title}
              </h2>
              <KeyboardArrowRightIcon />
            </div>
            <Swiper {...swiperConfig}>
              {movies.map((movie) => (
                <SwiperSlide
                  onClick={() => moveToDetail(movie.id.toString())}
                  key={movie.id}>
                  <div className={clsx('relative', 'h-36', 'cursor-pointer')}>
                    <Image
                      src={tmdb.originalImage(movie.backdrop_path)}
                      objectFit='cover'
                      alt='Thumbnail'
                      layout='fill'
                      className={clsx('rounded-lg')}
                      priority={true}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}
    </>
  );
}

export default MoviesGenreList;
