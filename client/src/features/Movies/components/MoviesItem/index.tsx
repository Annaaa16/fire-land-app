import { useRouter } from 'next/router';

// clsx
import clsx from 'clsx';

// types
import { Movie } from '@/models/common';

import { PATHS } from '@/constants';
import tmdb, { tmdbCategories } from '@/configs/tmdb';

import Image from '@/components/Image';

interface MoviesItemProps {
  movie: Movie;
  category: keyof typeof tmdbCategories;
}

function MoviesItem({ movie, category }: MoviesItemProps) {
  const router = useRouter();

  const moveToDetail = (id: string) => {
    router.push(`${PATHS.MOVIES}/${id}?category=${category}`);
  };

  return (
    <div
      onClick={() => moveToDetail(movie.id)}
      className={clsx('relative', 'h-36', 'cursor-pointer')}>
      <Image
        src={tmdb.getW780Image(movie.image)}
        objectFit='cover'
        alt='Thumbnail'
        layout='fill'
        className={clsx('rounded-lg')}
        styleLoading='image'
      />
    </div>
  );
}

export default MoviesItem;
