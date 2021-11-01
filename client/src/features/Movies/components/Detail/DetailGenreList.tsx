// clsx
import clsx from 'clsx';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';

import { useMoviesSelector } from '@/redux/selectors';

function DetailGenreList() {
  const { detailInfo } = useMoviesSelector();

  const swiperConfig = {
    slidesPerView: 'auto' as 'auto',
    spaceBetween: 8,
  };

  return (
    <Swiper {...swiperConfig} className='mb-2'>
      {detailInfo.genres.map((genre) => (
        <SwiperSlide
          key={genre.id}
          className={clsx(
            'max-w-max text-xs rounded-full px-4 py-2',
            'bg-gray text-white',
            '!transition-all ease-out',
            'cursor-pointer',
            'hover:bg-primary-v4-hv'
          )}>
          {genre.name}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default DetailGenreList;
