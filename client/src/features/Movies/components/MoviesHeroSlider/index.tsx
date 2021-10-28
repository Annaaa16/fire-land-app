import { useState } from 'react';
import Image from 'next/image';

// clsx
import clsx from 'clsx';

// material ui icons
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';

import { useTmdbSelector } from '@/redux/selectors';
import tmdb from '@/configs/tmdb';

SwiperCore.use([Autoplay]);

function HomeHeroSlider() {
  const {
    movieList: { popular },
  } = useTmdbSelector();

  const [swiperConfig] = useState({
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 5000,
    },
  });

  return (
    <>
      {popular.movies.length > 0 && (
        <Swiper {...swiperConfig}>
          {popular.movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div className={clsx('relative', 'w-full h-screen')}>
                <Image
                  src={tmdb.originalImage(movie.backdrop_path)}
                  alt='Thumbnail'
                  layout='fill'
                  objectFit='cover'
                  priority={true}
                />

                <div
                  className={clsx(
                    'absolute inset-0',
                    'bg-gradient-to-t from-dk-body to-transparent'
                  )}
                />

                <div
                  className={clsx(
                    'relative',
                    'i-flex-center container h-full'
                  )}>
                  <div
                    className={clsx(
                      'text-center lg:text-left lg:w-1/2 lg:mr-6'
                    )}>
                    <h1
                      className={clsx(
                        'text-2xl md:text-4xl font-bold leading-tight lg:leading-normal mb-0.5',
                        'text-white'
                      )}>
                      {movie.title}
                    </h1>
                    <p className={clsx('leading-5 mb-4', 'text-white')}>
                      {movie.overview}
                    </p>
                    <div
                      className={clsx(
                        'flex items-center justify-center lg:justify-start'
                      )}>
                      <button
                        className={clsx(
                          'i-flex-center px-6 py-2.5 mr-4 shadow-primary-v4 rounded-lg',
                          'text-white bg-primary-v4',
                          'transition-all duration-300 ease-out',
                          'select-none',
                          'lg:hover:bg-primary-v4-hv'
                        )}>
                        <PlayArrowIcon className={clsx('!text-2xl mr-px')} />
                        <span className={clsx('font-bold text-base')}>
                          Play
                        </span>
                      </button>
                      <button
                        className={clsx(
                          'i-flex-center px-5 py-2.5 mr-4 shadow-md rounded-lg',
                          'text-white bg-gray',
                          'transition-all duration-300 ease-out',
                          'select-none',
                          'lg:hover:bg-gray-500'
                        )}>
                        <InfoOutlinedIcon className={clsx('!text-2xl mr-1')} />
                        <span className={clsx('font-bold text-base')}>
                          More Info
                        </span>
                      </button>
                    </div>
                  </div>

                  <div
                    className={clsx(
                      'relative',
                      'hidden lg:block w-72 h-100 flex-shrink-0'
                    )}>
                    <Image
                      src={tmdb.originalImage(movie.backdrop_path)}
                      layout='fill'
                      alt='Thumbnail'
                      objectFit='cover'
                      className={clsx('rounded-2xl')}
                      priority={true}
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}

export default HomeHeroSlider;
