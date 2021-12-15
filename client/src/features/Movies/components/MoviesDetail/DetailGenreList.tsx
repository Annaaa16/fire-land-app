// clsx
import clsx from 'clsx';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';

interface DetailGenreListProps {
  genres: Array<{ id: string; name: string }>;
}

const swiperConfig = {
  slidesPerView: 'auto' as 'auto',
  spaceBetween: 8,
};

function DetailGenreList({ genres }: DetailGenreListProps) {
  return (
    <Swiper {...swiperConfig} className='mb-2'>
      {genres.map((genre) => (
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
