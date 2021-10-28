import Image from 'next/image';

// clsx
import clsx from 'clsx';

import { COLORS } from '@/constants';
import tmdb from '@/configs/tmdb';

import Meta from '@/layouts/Meta';
import MainLayout from '../layouts/MainLayout';
import MoviesItemList from '../components/MoviesItemList';
import DetailTrailer from '../components/Detail/DetailTrailer';
import DetailCastList from '../components/Detail/DetailCastList';
import DetailGenreList from '../components/Detail/DetailGenreList';

import { useTmdbSelector } from '@/redux/selectors';

function Detail() {
  const {
    movieList,
    movieDetail: { overview, image, title, casts },
  } = useTmdbSelector();

  return (
    <Meta title='Movies Detail' backgroundColor={COLORS.DARK_BODY}>
      <MainLayout>
        <section>
          <div className={clsx('relative', 'w-full h-screen/2')}>
            <Image
              src={tmdb.originalImage(image)}
              alt='Thumbnail'
              layout='fill'
              objectFit='cover'
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
                src={tmdb.originalImage(image)}
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
          <div className='container'>
            <DetailTrailer />
            <MoviesItemList title='Similar' movies={movieList.similar.movies} />
          </div>
        </section>
      </MainLayout>
    </Meta>
  );
}

export default Detail;
