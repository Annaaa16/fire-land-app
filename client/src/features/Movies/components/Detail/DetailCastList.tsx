import { useState } from 'react';
import Image from 'next/image';

// clsx
import clsx from 'clsx';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';

// types
import { Cast } from '@/models/tmdb';

import { BREAKPOINTS } from '@/constants';
import tmdb from '@/configs/tmdb';

interface DetailCastListProps {
  casts: Cast[];
}

function DetailCastList({ casts }: DetailCastListProps) {
  const [swiperConfig] = useState({
    slidesPerView: 5.4,
    spaceBetween: 8,
    breakpoints: {
      [BREAKPOINTS.PHONE]: {
        slidesPerView: 3.3,
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
    <Swiper {...swiperConfig}>
      {casts?.map(
        (cast) =>
          cast.image && (
            <SwiperSlide key={cast.id}>
              <div className={clsx('relative', 'mb-2 h-32', 'cursor-pointer')}>
                <Image
                  src={tmdb.originalImage(cast.image)}
                  layout='fill'
                  objectFit='cover'
                  alt='Cast'
                  className={clsx('rounded-xl')}
                  priority={true}
                  onLoadingComplete={() => {
                    console.log('completed!!');
                  }}
                />
              </div>
              <div className={clsx('text-center text-xs', 'text-white')}>
                {cast.name}
              </div>
            </SwiperSlide>
          )
      )}
    </Swiper>
  );
}

export default DetailCastList;
