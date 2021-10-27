import Image from 'next/image';

// clsx
import clsx from 'clsx';

// material ui icons
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import img from '@/assets/svgs/thumb.jpg';

function HomeHeroContent() {
  return (
    <div className={clsx('relative', 'i-flex-center container h-full')}>
      <div className={clsx('text-center lg:text-left lg:w-1/2 lg:mr-6')}>
        <h1
          className={clsx(
            'text-2xl md:text-4xl font-bold leading-tight lg:leading-normal mb-0.5',
            'text-white'
          )}>
          My Hero Academia: World Heroes' Mission
        </h1>
        <p className={clsx('leading-5 mb-4', 'text-white')}>
          A mysterious group called Humarize strongly believes in the Quirk
          Singularity Doomsday theory which states that when quirks get mixed
          further in with future generations, that power will bring forth the
          end of humanity. In order to save everyone, the Pro-Heroes around the
          world ask UA Academy heroes-in-training to assist them and form a
          world-classic selected hero team. It is up to the heroes to save the
          world and the future of heroes in what is the most dangerous crisis to
          take place yet in My Hero Academy.
        </p>
        <div
          className={clsx('flex items-center justify-center lg:justify-start')}>
          <button
            className={clsx(
              'i-flex-center px-6 py-2.5 mr-4 shadow-primary-v4 rounded-lg',
              'text-white bg-primary-v4',
              'transition-all duration-300 ease-out',
              'select-none',
              'lg:hover:bg-primary-v4-hv'
            )}>
            <PlayArrowIcon className={clsx('!text-2xl mr-px')} />
            <span className={clsx('font-bold text-base')}>Play</span>
          </button>
          <button
            className={clsx(
              'i-flex-center px-5 py-2.5 mr-4 shadow-md rounded-lg',
              'text-white bg-gray',
              'transition-all duration-300 ease-out',
              'select-none',
              'lg:hover:bg-gray-500'
            )}>
            <InfoOutlinedIcon className={clsx('!text-2xl mr-1')} />
            <span className={clsx('font-bold text-base')}>More Info</span>
          </button>
        </div>
      </div>

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
    </div>
  );
}

export default HomeHeroContent;
