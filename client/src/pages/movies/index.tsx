// types
import { GetServerSideProps } from 'next';

import { movieCategoryKeys, setMovies } from '@/redux/slices/moviesSlice';
import { moviesApiClient } from '@/apis/moviesApi';
import { wrapper } from '@/redux/store';

import { tmdbMoviesEndpoints } from '@/configs/tmdb';

import Movies from '@/features/Movies/pages';

function MoviesPage() {
  return <Movies />;
}

export default MoviesPage;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    const { getMovies } = moviesApiClient();

    const { popular, upcoming, topRated, nowPlaying } = tmdbMoviesEndpoints;

    const promises = await Promise.all([
      getMovies(popular, {
        page: 1,
      }),
      getMovies(upcoming, {
        page: 1,
      }),
      getMovies(topRated, {
        page: 1,
      }),
      getMovies(nowPlaying, {
        page: 1,
      }),
    ]);

    promises.forEach((promise) => {
      const getMovieType = () => {
        const path = promise?.config.url;
        const endpoint = path?.split('/')[2]; // '/movie/popular' => ['', 'movie', 'popular']

        switch (endpoint) {
          case popular:
            return movieCategoryKeys.popular;
          case upcoming:
            return movieCategoryKeys.upcoming;
          case topRated:
            return movieCategoryKeys.topRated;
          case nowPlaying:
            return movieCategoryKeys.nowPlaying;
          default:
            return '';
        }
      };

      store.dispatch(
        setMovies({
          moviesType: getMovieType() as keyof typeof movieCategoryKeys,
          movies: promise?.data!,
        })
      );
    });

    return {
      props: {},
    };
  });
