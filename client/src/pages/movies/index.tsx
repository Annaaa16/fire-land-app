import { useEffect } from 'react';

// types
import { GetServerSideProps } from 'next';

import {
  clearSearchedMovies,
  movieCategoryKeys,
  setMovies,
} from '@/redux/slices/moviesSlice';
import { moviesApi } from '@/apis/moviesApi';
import { wrapper } from '@/redux/store';
import { tmdbMoviesEndpoints } from '@/configs/tmdb';
import { useMoviesSelector } from '@/redux/selectors';
import { tvShowCategoryKeys } from '@/redux/slices/moviesSlice';
import { getTvShows } from '@/redux/actions/movies';
import { tmdbCategories, tvShowsEndpoints } from '@/configs/tmdb';
import useStoreDispatch from '@/hooks/useStoreDispatch';

import SearchField from '@/components/SearchField';
import MainLayout from '@/features/Movies/layouts/MainLayout';
import MoviesItemList from '@/features/Movies/components/MoviesItemList';
import MoviesHeroSlider from '@/features/Movies/components/MoviesHeroSlider';

function Movies() {
  const { movieCategories, tvShowCategories } = useMoviesSelector();

  const dispatch = useStoreDispatch();

  useEffect(() => {
    dispatch(
      getTvShows.request({
        query: tvShowsEndpoints.popular,
        params: {
          page: 1,
        },
        tvShowsType: tvShowCategoryKeys.popular,
      })
    );
    dispatch(
      getTvShows.request({
        query: tvShowsEndpoints.airingToday,
        params: {
          page: 1,
        },
        tvShowsType: tvShowCategoryKeys.airingToday,
      })
    );
    dispatch(
      getTvShows.request({
        query: tvShowsEndpoints.onTheAir,
        params: {
          page: 1,
        },
        tvShowsType: tvShowCategoryKeys.onTheAir,
      })
    );
    dispatch(clearSearchedMovies());
  }, [dispatch]);

  return (
    <MainLayout title='Movies'>
      <MoviesHeroSlider />
      <SearchField />
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
  wrapper.getServerSideProps((store) => async (ctx) => {
    const { getMovies } = moviesApi();

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
