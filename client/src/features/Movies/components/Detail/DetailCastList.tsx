import { useState } from 'react';
import Image from 'next/image';

// clsx
import clsx from 'clsx';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';

import { BREAKPOINTS } from '@/constants';

import img from '@/assets/svgs/thumb.jpg';

function DetailCastList() {
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
      <SwiperSlide>
        <div className={clsx('relative', 'mb-2 h-32', 'cursor-pointer')}>
          <Image
            src={img.src}
            layout='fill'
            objectFit='cover'
            alt='Cast'
            className={clsx('rounded-xl')}
          />
        </div>
        <div className={clsx('text-center text-2sm', 'text-white')}>IG Dev</div>
      </SwiperSlide>
    </Swiper>
  );
}

export default DetailCastList;
