import { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';

// types
import { GetServerSideProps } from 'next';

// clsx
import clsx from 'clsx';

import {
  clearSearchedMovies,
  setSearchedMovies,
} from '@/redux/slices/moviesSlice';
import { wrapper } from '@/redux/store';
import { moviesApi } from '@/apis/moviesApi';
import { useMoviesSelector } from '@/redux/selectors';
import { searchMovies } from '@/redux/actions/movies';
import { tmdbCategories } from '@/configs/tmdb';
import useStoreDispatch from '@/hooks/useStoreDispatch';
import useMeeting from '@/hooks/useMeeting';

import MainLayout from '@/features/Movies/layouts/MainLayout';
import MoviesItem from '@/features/Movies/components/MoviesItem';

function Search() {
  const {
    searchedMovies: { page, movies, totalPages, totalMovies },
  } = useMoviesSelector();

  const scrollRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const isMeeting = useMeeting(scrollRef, '500px');
  const dispatch = useStoreDispatch();

  useEffect(() => {
    if (isMeeting && movies.length < totalMovies && page < totalPages) {
      dispatch(
        searchMovies.request({
          page: page + 1,
          query: tmdbCategories.movie,
        })
      );
    }
  }, [isMeeting, page, movies.length, totalMovies, totalPages, dispatch]);

  return (
    <MainLayout title={'Search - ' + router.query.query}>
      <section className='pt-20'>
        <h1
          className={clsx(
            'text-center text-3xl mb-4 leading-normal uppercase font-bold',
            'text-white'
          )}>
          Movies - {router.query.query}
        </h1>
        <div
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
      <div ref={scrollRef} />
    </MainLayout>
  );
}

export default Search;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ query }) => {
    const { searchMovies } = moviesApi();

    store.dispatch(clearSearchedMovies());

    const response = await searchMovies({
      query: query.query as string,
    });

    response && store.dispatch(setSearchedMovies(response.data));

    return {
      props: {},
    };
  });