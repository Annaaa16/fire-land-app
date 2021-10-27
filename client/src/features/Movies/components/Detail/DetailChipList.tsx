import { useState } from 'react';

// clsx
import clsx from 'clsx';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';

function DetailChipList() {
  const [swiperConfig] = useState({
    slidesPerView: 'auto' as 'auto',
    spaceBetween: 8,
  });

  return (
    <Swiper {...swiperConfig} className='mb-2'>
      <SwiperSlide
        className={clsx(
          'max-w-max text-xs rounded-full px-4 py-2',
          'bg-gray text-white',
          '!transition-all !ease-out',
          'cursor-pointer',
          'hover:bg-primary-v4-hv'
        )}>
        Drama
      </SwiperSlide>
    </Swiper>
  );
}

export default DetailChipList;
