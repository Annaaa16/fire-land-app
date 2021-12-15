import Image from 'next/image';
import { useRouter } from 'next/router';

// clsx
import clsx from 'clsx';

// material ui icons
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';

import { PATHS } from '@/constants';
import { useMoviesSelector } from '@/redux/selectors';
import tmdb, { tmdbCategories } from '@/configs/tmdb';

import Paragraph from '@/components/Paragraph';

const swiperConfig = {
  slidesPerView: 1,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
};

function HomeHeroSlider() {
  const {
    movieCategories: { popular },
  } = useMoviesSelector();

  const router = useRouter();

  const moveToDetail = (id: string) => {
    router.push(`${PATHS.MOVIES}/${id}?category=${tmdbCategories.movie}`);
  };

  return (
    <>
      {popular.movies.length > 0 && (
        <Swiper {...swiperConfig}>
          {popular.movies.map(
            (movie) =>
              movie.image &&
              movie.title && (
                <SwiperSlide key={movie.id}>
                  {({ isActive }) => (
                    <div
                      className={clsx(
                        'relative',
                        'w-full h-[85vh] md:h-[60vh] lg:h-screen'
                      )}>
                      <Image
                        src={tmdb.getOriginalImage(movie.image)}
                        alt='Thumbnail'
                        layout='fill'
                        objectFit='cover'
                        priority={true}
                        className={clsx(
                          isActive ? 'opacity-100' : 'opacity-0',
                          'transition-all duration-500 ease-linear'
                        )}
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
                          'flex-center container h-full'
                        )}>
                        <div
                          className={clsx(
                            'text-center lg:text-left lg:w-1/2 lg:mr-6'
                          )}>
                          <h1
                            className={clsx(
                              'text-2xl md:text-4xl font-semibold leading-tight lg:leading-normal mb-0.5',
                              isActive
                                ? 'translate-y-0 opacity-100'
                                : '-translate-y-8 opacity-0',
                              'transition-all duration-700 ease-in-out ',
                              'text-white'
                            )}>
                            {movie.title}
                          </h1>
                          <Paragraph
                            lengthInit={250}
                            bodyClass={clsx('mb-3')}
                            paragraphClass={clsx(
                              'leading-5 mb-1',
                              'text-white',
                              isActive
                                ? 'translate-x-0 opacity-100'
                                : '-translate-x-5 opacity-0',
                              'text-white',
                              'transition-all duration-700 ease-out delay-500'
                            )}
                            buttonClass={clsx(
                              isActive
                                ? 'opacity-100 visible'
                                : 'opacity-0 invisible',
                              'text-white',
                              'transition-all duration-700 ease-out delay-1000',
                              'lg:hover:underline'
                            )}>
                            {movie.overview}
                          </Paragraph>
                          <div
                            className={clsx(
                              'flex items-center justify-center lg:justify-start'
                            )}>
                            <button
                              onClick={() => moveToDetail(movie.id)}
                              className={clsx(
                                'btn px-4 lg:px-6 py-2 lg:py-2.5 mr-4 !shadow-primary-v4 rounded-lg',
                                '!bg-primary-v4',
                                'lg:hover:!bg-primary-v4-hv'
                              )}>
                              <PlayArrowIcon
                                className={clsx('!text-xl lg:!text-2xl mr-px')}
                              />
                              <span
                                className={clsx(
                                  'font-semibold text-sm lg:text-base'
                                )}>
                                Play
                              </span>
                            </button>
                            <button
                              className={clsx(
                                'flex-center px-4 lg:px-5 py-2 lg:py-2.5 mr-4 shadow-md rounded-lg',
                                'text-white bg-gray',
                                'transition-all duration-300 ease-out',
                                'select-none',
                                'lg:hover:bg-gray-500'
                              )}>
                              <InfoOutlinedIcon
                                className={clsx('!text-xl lg:!text-2xl mr-1')}
                              />
                              <span
                                className={clsx(
                                  'font-semibold text-sm lg:text-base'
                                )}>
                                More Info
                              </span>
                            </button>
                          </div>
                        </div>

                        <div
                          className={clsx(
                            'relative',
                            'hidden lg:block w-72 h-100 flex-shrink-0',
                            isActive
                              ? 'translate-y-0 scale-100 opacity-100'
                              : '-translate-y-4 scale-75 opacity-0',
                            'transition-all duration-700 ease-out delay-200'
                          )}>
                          <Image
                            src={tmdb.getOriginalImage(movie.image)}
                            layout='fill'
                            alt='Thumbnail'
                            objectFit='cover'
                            className={clsx('rounded-2xl')}
                            priority={true}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </SwiperSlide>
              )
          )}
        </Swiper>
      )}
    </>
  );
}

export default HomeHeroSlider;
