import { useEffect } from 'react';

// types
import { GetServerSideProps } from 'next';
import { TmdbGetMoviesResponse, TmdbMoviesEndpoints } from '@/models/tmdb';
import { MovieCategoryKeys } from '@/models/movies';

import { movieCategoryKeys, movieActions } from '@/redux/slices/moviesSlice';
import { moviesApi } from '@/apis/moviesApi';
import { wrapper } from '@/redux/store';
import { tmdbMoviesEndpoints } from '@/configs/tmdb';
import { useMoviesSelector } from '@/redux/selectors';
import { tvShowCategoryKeys } from '@/redux/slices/moviesSlice';
import { tmdbCategories, tmdbTvShowsEndpoints } from '@/configs/tmdb';
import { notifyPageError } from '@/helpers/notifyError';
import useStoreDispatch from '@/hooks/useStoreDispatch';

import MainLayout from '@/features/Movies/layouts/MainLayout';
import MoviesItemList from '@/features/Movies/components/MoviesItemList';
import MoviesHeroSlider from '@/features/Movies/components/MoviesHeroSlider';
import MoviesSearch from '@/features/Movies/components/MoviesSearch';

function Movies() {
  const { movieCategories, tvShowCategories } = useMoviesSelector();

  const dispatch = useStoreDispatch();

  useEffect(() => {
    dispatch(
      movieActions.getTvShowsRequest({
        query: tmdbTvShowsEndpoints.popular,
        params: {
          page: 1,
        },
        tvShowsType: tvShowCategoryKeys.popular,
      })
    );
    dispatch(
      movieActions.getTvShowsRequest({
        query: tmdbTvShowsEndpoints.airingToday,
        params: {
          page: 1,
        },
        tvShowsType: tvShowCategoryKeys.airingToday,
      })
    );
    dispatch(
      movieActions.getTvShowsRequest({
        query: tmdbTvShowsEndpoints.onTheAir,
        params: {
          page: 1,
        },
        tvShowsType: tvShowCategoryKeys.onTheAir,
      })
    );
    dispatch(movieActions.clearSearchedMovies());
  }, [dispatch]);

  return (
    <MainLayout title='Movies'>
      <MoviesHeroSlider />
      <MoviesSearch />
      <MoviesItemList
        title='Upcoming Movies'
        items={movieCategories.upcoming.movies}
        category={tmdbCategories.movie}
      />
      <MoviesItemList
        title='Top Rated'
        items={movieCategories.topRated.movies}
        category={tmdbCategories.movie}
      />
      <MoviesItemList
        title='Now Playing'
        items={movieCategories.nowPlaying.movies}
        category={tmdbCategories.movie}
      />
      <MoviesItemList
        title='TV Shows Popular'
        items={tvShowCategories.popular.tvShows}
        category={tmdbCategories.tv}
      />
      <MoviesItemList
        title='TV Shows Airing Today'
        items={tvShowCategories.airingToday.tvShows}
        category={tmdbCategories.tv}
      />
      <MoviesItemList
        title='TV Shows On The Air'
        items={tvShowCategories.onTheAir.tvShows}
        category={tmdbCategories.tv}
      />
    </MainLayout>
  );
}

export default Movies;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async () => {
    const { getMovies } = moviesApi();

    const { popular, upcoming, topRated, nowPlaying } = tmdbMoviesEndpoints;

    try {
      const handleGetMovies = async (
        endpoint: string,
        type: keyof MovieCategoryKeys
      ) => {
        const response = await getMovies(endpoint, {
          page: 1,
        });

        store.dispatch(
          movieActions.getMoviesSuccess({
            moviesType: type,
            movies: response?.data as TmdbGetMoviesResponse,
          })
        );
      };

      await Promise.all([
        handleGetMovies(popular, movieCategoryKeys.popular),
        handleGetMovies(upcoming, movieCategoryKeys.upcoming),
        handleGetMovies(topRated, movieCategoryKeys.topRated),
        handleGetMovies(nowPlaying, movieCategoryKeys.nowPlaying),
      ]);
    } catch (error) {
      notifyPageError('Movies', error);
    }

    return {
      props: {},
    };
  });
