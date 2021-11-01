import Image from '@/components/Image';

// clsx
import clsx from 'clsx';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';

// types
import { Cast } from '@/models/movies';

import { BREAKPOINTS } from '@/constants';
import tmdb from '@/configs/tmdb';

interface DetailCastListProps {
  casts: Cast[];
}

function DetailCastList({ casts }: DetailCastListProps) {
  const swiperConfig = {
    slidesPerView: 5.4,
    spaceBetween: 8,
    breakpoints: {
      [BREAKPOINTS.PHONE]: {
        slidesPerView: 3.3,
        spaceBetween: 8,
      },
      [BREAKPOINTS.TABLET]: {
        slidesPerView: 6.4,
        spaceBetween: 8,
      },
      [BREAKPOINTS.DESKTOP]: {
        slidesPerView: 5.8,
        spaceBetween: 8,
      },
    },
  };

  return (
    <Swiper {...swiperConfig}>
      {casts?.map(
        (cast) =>
          cast.image && (
            <SwiperSlide key={cast.id}>
              <div className={clsx('relative', 'mb-2 h-32', 'cursor-pointer')}>
                <Image
                  src={tmdb.getW780Image(cast.image)}
                  layout='fill'
                  objectFit='cover'
                  alt='Cast'
                  subClass={clsx('rounded-xl')}
                  priority={true}
                  height={12}
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
