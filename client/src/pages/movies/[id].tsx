import { useEffect } from 'react';
import { useRouter } from 'next/router';

// clsx
import clsx from 'clsx';

// types
import { GetServerSideProps } from 'next';
import { AxiosError } from 'axios';
import {
  TmdbGetMovieCreditsResponse,
  TmdbGetMovieVideosResponse,
  TmdbMovieDetail,
} from '@/models/tmdb';

import { moviesApi } from '@/apis/moviesApi';
import { notifyAxiosError } from '@/helpers/notifyError';
import { useMoviesSelector } from '@/redux/selectors';
import { filterMovieDetail } from '@/helpers/filterMovies';
import { moviesActions } from '@/redux/slices/moviesSlice';
import tmdb, { tmdbCategories } from '@/configs/tmdb';
import useStoreDispatch from '@/hooks/useStoreDispatch';

import Image from '@/components/Image';
import Paragraph from '@/components/Paragraph';
import MainLayout from '@/features/Movies/layouts/MainLayout';
import MoviesItemList from '@/features/Movies/components/MoviesItemList';
import DetailTrailer from '@/features/Movies/components/MoviesDetail/DetailTrailer';
import DetailCastList from '@/features/Movies/components/MoviesDetail/DetailCastList';
import DetailGenreList from '@/features/Movies/components/MoviesDetail/DetailGenreList';

export interface MoviesDetailProps {
  movieDetail: {
    casts: TmdbGetMovieCreditsResponse;
    detail: TmdbMovieDetail;
    videos: TmdbGetMovieVideosResponse;
  };
}

function MoviesDetail(props: MoviesDetailProps) {
  const { title, image, casts, overview, genres, videos } =
    filterMovieDetail(props);

  const { movie, tv } = tmdbCategories;

  const { movieCategories, tvShowCategories } = useMoviesSelector();

  const dispatch = useStoreDispatch();
  const router = useRouter();

  useEffect(() => {
    const { id, category } = router.query;

    // Block first load ID is undefined
    if (!id || !category) return;

    if (category === movie) {
      dispatch(moviesActions.getSimilarMoviesRequest(id! as string));
    } else if (category === tv) {
      dispatch(moviesActions.getSimilarTvShowsRequest(id! as string));
    }
  }, [router.query, movie, tv, dispatch]);

  return (
    <MainLayout title={'Movies - ' + title}>
      <section>
        <div className={clsx('relative', 'w-full h-[50vh]')}>
          <Image
            src={tmdb.getOriginalImage(image)}
            alt='Thumbnail'
            layout='fill'
            objectFit='cover'
            priority={true}
            styleLoading='cover'
          />
          <div
            className={clsx(
              'absolute inset-0',
              'bg-gradient-to-t from-dk-body to-transparent'
            )}
          />
        </div>

        <div
          className={clsx(
            'relative',
            'container flex justify-center h-full mb-20 -mt-50'
          )}>
          <div
            className={clsx(
              'relative',
              'hidden lg:block w-72 h-100 flex-shrink-0'
            )}>
            <Image
              src={tmdb.getOriginalImage(image)}
              layout='fill'
              alt='Thumbnail'
              objectFit='cover'
              className={clsx('rounded-2xl')}
              priority={true}
              loadingWidths={[50, 20, 30, 40, 90, 40, 50, 70]}
              styleLoading='image'
            />
          </div>

          <div
            className={clsx(
              'text-center lg:text-left w-full lg:w-1/2 lg:ml-6'
            )}>
            <h1
              className={clsx(
                'text-2xl md:text-4xl font-semibold leading-tight lg:leading-normal mb-2',
                'text-white'
              )}>
              {title}
            </h1>
            <DetailGenreList genres={genres} />
            <Paragraph
              lengthInit={250}
              bodyClass={clsx('mb-3')}
              paragraphClass={clsx('leading-5 mb-2', 'text-white')}
              buttonClass={clsx('mb-4', 'text-white', 'lg:hover:underline')}>
              {overview}
            </Paragraph>

            <DetailCastList casts={casts} />
          </div>
        </div>
        <DetailTrailer videos={videos} />
        {router.query.category && (
          <MoviesItemList
            title='Similar'
            items={
              router.query.category === movie
                ? movieCategories.similar.movies
                : tvShowCategories.similar.tvShows
            }
            category={
              router.query.category === movie
                ? tmdbCategories.movie
                : tmdbCategories.tv
            }
          />
        )}
      </section>
    </MainLayout>
  );
}

export default MoviesDetail;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
}) => {
  const { movie, tv } = tmdbCategories;
  const {
    getMovieDetail,
    getMovieCasts,
    getMovieVideos,
    getTvShowDetail,
    getTvShowCasts,
    getTvShowVideos,
  } = moviesApi();

  let movieDetail = null;

  if (query.category === movie) {
    try {
      const promises = await Promise.all([
        getMovieDetail(params?.id as string),
        getMovieCasts(params?.id as string),
        getMovieVideos(params?.id as string),
      ]);

      movieDetail = {
        detail: promises[0]?.data!,
        casts: promises[1]?.data!,
        videos: promises[2]?.data!,
      };
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

      movieDetail = {
        detail: promises[0]?.data!,
        casts: promises[1]?.data!,
        videos: promises[2]?.data!,
      };
    } catch (error) {
      notifyAxiosError('Get TV Shows detail', error as AxiosError);
    }
  }

  if (!movieDetail) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: {
        movieDetail,
      },
    };
  }
};
