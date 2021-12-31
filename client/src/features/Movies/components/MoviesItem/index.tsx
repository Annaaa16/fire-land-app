import { useRef } from 'react';
import { useRouter } from 'next/router';

// clsx
import clsx from 'clsx';

// types
import { Movie } from '@/models/common';
import { TmdbCategories } from '@/models/tmdb';

import { PATHS } from '@/constants';
import { useMoviesContext } from '@/contexts/MoviesContext';
import tmdb from '@/configs/tmdb';

import Image from '@/components/Image';

interface MoviesItemProps {
  movie: Movie;
  category: keyof TmdbCategories;
}

function MoviesItem({ movie, category }: MoviesItemProps) {
  const {
    handleShowPreview,
    handleSetContainerEl,
    handleHidePreview,
    clearTimer,
  } = useMoviesContext();

  const hoverRef = useRef<HTMLDivElement>(null!);

  const router = useRouter();

  const handleClick = () => {
    router.push({
      pathname: PATHS.MOVIES + '/' + movie.id,
      query: { category },
    });
    handleHidePreview();
  };

  const handleMouseEnter = () => {
    handleShowPreview(hoverRef.current, movie);

    let containerEl = hoverRef.current.parentElement;

    while (containerEl) {
      if (containerEl.hasAttribute('data-movies-container')) {
        return handleSetContainerEl(containerEl);
      }

      containerEl = containerEl.parentElement;
    }
  };

  return (
    <Image
      ref={hoverRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={clearTimer}
      onClick={handleClick}
      src={tmdb.getW500Image(movie.image)}
      objectFit='cover'
      alt='Thumbnail'
      layout='fill'
      className={clsx('h-36 rounded-lg overflow-hidden', 'cursor-pointer')}
      styleLoading='image'
      skeletonClass='!opacity-50'
    />
  );
}

export default MoviesItem;
