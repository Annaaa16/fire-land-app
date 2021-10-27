import Image from 'next/image';

// clsx
import clsx from 'clsx';

import { COLORS } from '@/constants';

import Meta from '@/layouts/Meta';
import MainLayout from '../layouts/MainLayout';
import MoviesGenreList from '../components/MoviesGenreList';
import DetailTrailer from '../components/Detail/DetailTrailer';
import DetailCastList from '../components/Detail/DetailCastList';
import DetailChipList from '../components/Detail/DetailChipList';

import img from '@/assets/svgs/thumb.jpg';

function Detail() {
  return (
    <Meta title='Movies Detail' backgroundColor={COLORS.DARK_BODY}>
      <MainLayout>
        <section>
          <div className={clsx('relative', 'w-full h-screen/2')}>
            <Image
              src={img.src}
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
                'hidden lg:block w-80 h-100 flex-shrink-0'
              )}>
              <Image
                src={img.src}
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
                My Hero Academia: World Heroes' Mission
              </h1>
              <DetailChipList />
              <p className={clsx('leading-5 mb-4', 'text-white')}>
                A mysterious group called Humarize strongly believes in the
                Quirk Singularity Doomsday theory which states that when quirks
                get mixed further in with future generations, that power will
                bring forth the end of humanity. In order to save everyone, the
                Pro-Heroes around the world ask UA Academy heroes-in-training to
                assist them and form a world-classic selected hero team. It is
                up to the heroes to save the world and the future of heroes in
                what is the most dangerous crisis to take place yet in My Hero
                Academy.
              </p>

              <DetailCastList />
            </div>
          </div>
          <div className='container'>
            <DetailTrailer />
            <MoviesGenreList title='Similar' />
          </div>
        </section>
      </MainLayout>
    </Meta>
  );
}

export default Detail;
