import { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';

// types
import { GetServerSideProps } from 'next';

// clsx
import clsx from 'clsx';

import { movieActions } from '@/redux/slices/moviesSlice';
import { wrapper } from '@/redux/store';
import { moviesApi } from '@/apis/moviesApi';
import { useMoviesSelector } from '@/redux/selectors';
import { tmdbCategories } from '@/configs/tmdb';
import useStoreDispatch from '@/hooks/useStoreDispatch';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

import MainLayout from '@/features/Movies/layouts/MainLayout';
import MoviesItem from '@/features/Movies/components/MoviesItem';

function Search() {
  const {
    searchedMovies: { page, movies, totalPages, totalMovies },
  } = useMoviesSelector();

  const observerRef = useRef<HTMLDivElement>(null);

  const isIntersecting = useIntersectionObserver(observerRef, '500px');
  const router = useRouter();
  const dispatch = useStoreDispatch();

  useEffect(() => {
    if (isIntersecting && movies.length < totalMovies && page < totalPages) {
      dispatch(
        movieActions.searchMoviesRequest({
          page: page + 1,
          query: tmdbCategories.movie,
        })
      );
    }
  }, [isIntersecting, page, movies.length, totalMovies, totalPages, dispatch]);

  return (
    <MainLayout title={'Search - ' + router.query.query}>
      <section className='pt-20'>
        <h1
          className={clsx(
            'text-center text-3xl mb-4 leading-normal uppercase font-semibold',
            'text-white'
          )}>
          Movies - {router.query.query}
        </h1>
        <div
          data-movies-container
          className={clsx(
            'container grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1.5'
          )}>
          {movies.map(
            (movie) =>
              movie.image && (
                <MoviesItem key={movie.id} movie={movie} category={'movie'} />
              )
          )}
        </div>
      </section>
      <div ref={observerRef} />
    </MainLayout>
  );
}

export default Search;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ query }) => {
    const { searchMovies } = moviesApi();

    store.dispatch(movieActions.clearSearchedMovies());

    const response = await searchMovies({
      query: query.query as string,
    });

    response && store.dispatch(movieActions.searchMoviesSuccess(response.data));

    return {
      props: {},
    };
  });
