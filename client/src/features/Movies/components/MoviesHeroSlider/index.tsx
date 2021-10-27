import { useState } from 'react';
import Image from 'next/image';

// clsx
import clsx from 'clsx';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';

import MoviesHeroContent from '../MoviesHeroContent';

import img from '@/assets/svgs/thumb.jpg';

function HomeHeroSlider() {
  const [swiperConfig] = useState({
    slidesPerView: 1,
    loop: true,
  });

  return (
    <Swiper {...swiperConfig}>
      <SwiperSlide>
        <div className={clsx('relative', 'w-full h-screen')}>
          <Image
            src={img.src}
            alt='Thumbnail'
            layout='fill'
            objectFit='cover'
          />

          <div
            className={clsx(
              'absolute inset-0',
              'bg-gradient-to-t from-dk-body to-transparent'
            )}
          />

          <MoviesHeroContent />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default HomeHeroSlider;
