import { useEffect } from 'react';

import { COLORS } from '@/constants';

import { useMoviesSelector } from '@/redux/selectors';
import { tvShowCategoryKeys } from '@/redux/slices/moviesSlice';
import { getTvShows } from '@/redux/actions/movies';
import { tmdbCategories, tvShowsEndpoints } from '@/configs/tmdb';
import useStoreDispatch from '@/hooks/useStoreDispatch';

import Meta from '@/layouts/Meta';
import MainLayout from '../layouts/MainLayout';
import MoviesItemList from '../components/MoviesItemList';
import MoviesHeroSlider from '../components/MoviesHeroSlider';

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
  }, [dispatch]);

  return (
    <Meta title='Movies' backgroundColor={COLORS.DARK_BODY}>
      <MainLayout>
        <MoviesHeroSlider />
        <MoviesItemList
          title='Upcoming Movies'
          movies={movieCategories.upcoming.movies}
          category={tmdbCategories.movie}
        />
        <MoviesItemList
          title='Top Rated'
          movies={movieCategories.topRated.movies}
          category={tmdbCategories.movie}
        />
        <MoviesItemList
          title='Now Playing'
          movies={movieCategories.nowPlaying.movies}
          category={tmdbCategories.movie}
        />
        <MoviesItemList
          title='TV Shows Popular'
          movies={tvShowCategories.popular.tvShows}
          category={tmdbCategories.tv}
        />
        <MoviesItemList
          title='TV Shows Airing Today'
          movies={tvShowCategories.airingToday.tvShows}
          category={tmdbCategories.tv}
        />
        <MoviesItemList
          title='TV Shows On The Air'
          movies={tvShowCategories.onTheAir.tvShows}
          category={tmdbCategories.tv}
        />
      </MainLayout>
    </Meta>
  );
}

export default Movies;
