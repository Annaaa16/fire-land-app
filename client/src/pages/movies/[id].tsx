import { useEffect } from 'react';
import { useRouter } from 'next/router';

// types
import { GetServerSideProps } from 'next';
import { AxiosError } from 'axios';

// clsx
import clsx from 'clsx';

import { moviesApi } from '@/apis/moviesApi';
import { notifyAxiosError } from '@/helpers/notify';
import { setMovieDetail, setTvShowDetail } from '@/redux/slices/moviesSlice';
import { wrapper } from '@/redux/store';
import { useMoviesSelector } from '@/redux/selectors';
import { getSimilarMovies, getSimilarTvShows } from '@/redux/actions/movies';
import tmdb, { tmdbCategories } from '@/configs/tmdb';
import useStoreDispatch from '@/hooks/useStoreDispatch';

import Image from '@/components/Image';
import Paragraph from '@/components/Paragraph';
import MainLayout from '@/features/Movies/layouts/MainLayout';
import MoviesItemList from '@/features/Movies/components/MoviesItemList';
import DetailTrailer from '@/features/Movies/components/Detail/DetailTrailer';
import DetailCastList from '@/features/Movies/components/Detail/DetailCastList';
import DetailGenreList from '@/features/Movies/components/Detail/DetailGenreList';

function Detail() {
  const { movie, tv } = tmdbCategories;

  const {
    movieCategories,
    tvShowCategories,
    detailInfo: { overview, image, title, casts },
  } = useMoviesSelector();

  const dispatch = useStoreDispatch();
  const router = useRouter();

  useEffect(() => {
    const { id, category } = router.query;

    // Block first load ID is undefined
    if (!id) return;

    if (category === movie) {
      dispatch(getSimilarMovies.request(id! as string));
    } else if (category === tv) {
      dispatch(getSimilarTvShows.request(id! as string));
    }
  }, [router.query, movie, tv, dispatch]);

  return (
    <MainLayout title={'Movies - ' + title}>
      <section>
        <div className={clsx('relative', 'w-full h-screen/2')}>
          <Image
            src={tmdb.getOriginalImage(image)}
            alt='Thumbnail'
            layout='fill'
            objectFit='cover'
            priority={true}
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
              subClass={clsx('rounded-2xl')}
              priority={true}
              widths={[50, 20, 30, 40, 90, 40, 50, 70]}
            />
          </div>

          <div
            className={clsx(
              'text-center lg:text-left w-full lg:w-1/2 lg:ml-6'
            )}>
            <h1
              className={clsx(
                'text-2xl md:text-4xl font-bold leading-tight lg:leading-normal mb-2',
                'text-white'
              )}>
              {title}
            </h1>
            <DetailGenreList />
            <Paragraph
              lengthInit={250}
              bodyClass={clsx('mb-3')}
              paragraphClass={clsx('leading-5 mb-2', 'text-white')}
              buttonClass={clsx('mb-4', 'text-white', 'hover:underline')}>
              {overview}
            </Paragraph>

            <DetailCastList casts={casts} />
          </div>
        </div>
        <DetailTrailer />
        {router.query.category && (
          <MoviesItemList
            title='Similar'
            movies={
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

export default Detail;

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
    } = moviesApi();

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
