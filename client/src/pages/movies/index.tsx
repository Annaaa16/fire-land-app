// types
import { GetServerSideProps } from 'next';

import { MOVIE_TYPES } from '@/constants';
import { movieTypes, setMovieList } from '@/redux/slices/tmdbSlice';
import { tmdbApiClient } from '@/apis/tmdbApi';
import { wrapper } from '@/redux/store';

import Movies from '@/features/Movies/pages';

function MoviesPage() {
  return <Movies />;
}

export default MoviesPage;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    const { getMovies } = tmdbApiClient();

    const { data: popularData } = (await getMovies(MOVIE_TYPES.POPULAR, {
      page: 1,
    }))!;
    const { data: upcomingData } = (await getMovies(MOVIE_TYPES.UPCOMING, {
      page: 1,
    }))!;
    const { data: topRatedData } = (await getMovies(MOVIE_TYPES.TOP_RATED, {
      page: 1,
    }))!;

    store.dispatch(
      setMovieList({ listType: movieTypes.popular, movies: popularData })
    );
    store.dispatch(
      setMovieList({ listType: movieTypes.upcoming, movies: upcomingData })
    );
    store.dispatch(
      setMovieList({ listType: movieTypes.topRated, movies: topRatedData })
    );

    return {
      props: {},
    };
  });
