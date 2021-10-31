import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from '@/components/Image';

// clsx
import clsx from 'clsx';

import { COLORS } from '@/constants';
import { useMoviesSelector } from '@/redux/selectors';
import { getSimilarMovies, getSimilarTvShows } from '@/redux/actions/movies';
import tmdb, { tmdbCategories } from '@/configs/tmdb';
import useStoreDispatch from '@/hooks/useStoreDispatch';

import Meta from '@/layouts/Meta';
import MainLayout from '../layouts/MainLayout';
import MoviesItemList from '../components/MoviesItemList';
import DetailTrailer from '../components/Detail/DetailTrailer';
import DetailCastList from '../components/Detail/DetailCastList';
import DetailGenreList from '../components/Detail/DetailGenreList';

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
    <Meta title='Movies Detail' backgroundColor={COLORS.DARK_BODY}>
      <MainLayout>
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
                className={clsx('rounded-2xl')}
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
              <p className={clsx('leading-5 mb-4', 'text-white')}>{overview}</p>

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
    </Meta>
  );
}

export default Detail;
