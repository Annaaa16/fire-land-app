import { useState } from 'react';

// clsx
import clsx from 'clsx';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';

import { useMoviesSelector } from '@/redux/selectors';

function DetailGenreList() {
  const { detailInfo } = useMoviesSelector();

  const [swiperConfig] = useState({
    slidesPerView: 'auto' as 'auto',
    spaceBetween: 8,
  });

  return (
    <Swiper {...swiperConfig} className='mb-2'>
      {detailInfo.genres.map((genre) => (
        <SwiperSlide
          key={genre.id}
          className={clsx(
            'max-w-max text-xs rounded-full px-4 py-2',
            'bg-gray text-white',
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
