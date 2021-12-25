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

function DetailCastList({ casts }: DetailCastListProps) {
  return (
    <Swiper {...swiperConfig}>
      {casts?.map(
        (cast) =>
          cast.image && (
            <SwiperSlide key={cast.id}>
              <Image
                src={tmdb.getW780Image(cast.image)}
                layout='fill'
                objectFit='cover'
                alt='Cast'
                className={clsx(
                  'mb-2 h-32 rounded-xl overflow-hidden',
                  'cursor-pointer'
                )}
                priority={true}
                loadingHeight={12}
                styleLoading='image'
              />
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
