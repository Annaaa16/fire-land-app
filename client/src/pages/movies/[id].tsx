// types
import { GetStaticProps, GetStaticPaths } from 'next';
import { AxiosError } from 'axios';

import { tmdbApiClient } from '@/apis/tmdbApi';
import { notifyAxiosError } from '@/helpers/notify';

import MoviesDetail from '@/features/Movies/pages/Detail';
import { wrapper } from '@/redux/store';
import {
  movieTypes,
  setMovieDetail,
  setMovieList,
} from '@/redux/slices/tmdbSlice';

function MoviesDetailPage() {
  return <MoviesDetail />;
}

export default MoviesDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true };
};

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ params }) => {
      const { getMovieDetail, getSimilarMovies, getCasts, getVideos } =
        tmdbApiClient();

      try {
        const { data: movieDetailData } = (await getMovieDetail(
          params?.id as string
        ))!;
        const { data: moviesData } = (await getSimilarMovies(
          params?.id as string
        ))!;
        const { data: castsData } = (await getCasts(params?.id as string))!;
        const { data: videosData } = (await getVideos(params?.id as string))!;

        store.dispatch(
          setMovieDetail({
            casts: castsData,
            videos: videosData,
            detail: movieDetailData,
          })
        );
        store.dispatch(
          setMovieList({
            listType: movieTypes.similar,
            movies: moviesData,
          })
        );
      } catch (error) {
        notifyAxiosError('Get movie detail', error as AxiosError);
      }

      return {
        props: {},
        revalidate: 1,
      };
    }
);
