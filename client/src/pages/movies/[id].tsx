// types
import { GetServerSideProps } from 'next';
import { AxiosError } from 'axios';

import { moviesApiClient } from '@/apis/moviesApi';
import { notifyAxiosError } from '@/helpers/notify';
import { setMovieDetail, setTvShowDetail } from '@/redux/slices/moviesSlice';
import { tmdbCategories } from '@/configs/tmdb';
import { wrapper } from '@/redux/store';

import MoviesDetail from '@/features/Movies/pages/Detail';

function MoviesDetailPage() {
  return <MoviesDetail />;
}

export default MoviesDetailPage;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ params, query }) => {
    const { movie, tv } = tmdbCategories;
    const {
      getMovieDetail,
      getMovieCasts,
      getMovieVideos,
      getTvShowDetail,
      getTvShowCasts,
      getTvShowVideos,
    } = moviesApiClient();

    if (query.category === movie) {
      try {
        const promises = await Promise.all([
          getMovieDetail(params?.id as string),
          getMovieCasts(params?.id as string),
          getMovieVideos(params?.id as string),
        ]);

        store.dispatch(
          setMovieDetail({
            detail: promises[0]?.data!,
            casts: promises[1]?.data!,
            videos: promises[2]?.data!,
          })
        );
      } catch (error) {
        notifyAxiosError('Get movie detail', error as AxiosError);
      }
    } else if (query.category === tv) {
      try {
        const promises = await Promise.all([
          getTvShowDetail(params?.id as string),
          getTvShowCasts(params?.id as string),
          getTvShowVideos(params?.id as string),
        ]);

        store.dispatch(
          setTvShowDetail({
            detail: promises[0]?.data!,
            casts: promises[1]?.data!,
            videos: promises[2]?.data!,
          })
        );
      } catch (error) {
        notifyAxiosError('Get TV Shows detail', error as AxiosError);
      }
    }

    return {
      props: {},
    };
  });
