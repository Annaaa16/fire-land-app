// clsx
import clsx from 'clsx';

interface DetailTrailerProps {
  videos: Array<{ id: string; name: string; path: string }>;
}

function DetailTrailer({ videos }: DetailTrailerProps) {
  return (
    <div className='container'>
      <div className={clsx('mb-20')}>
        <div
          className={clsx(
            'inline-flex items-center mb-4',
            'text-white',
            'cursor-pointer',
            'hover:text-primary-v4-hv'
          )}>
          <h2
            className={clsx(
              'font-bold text-lg leading-none mr-2',
              'transition-all duration-300 ease-out'
            )}>
            Trailer
          </h2>
        </div>
        <iframe
          src={'https://www.youtube.com/embed/' + videos[0]?.path}
          title='Youtube Movie'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          className={'w-full h-64 md:h-100 lg:h-[700px]'}
          loading='lazy'
        />
      </div>
    </div>
  );
}

export default DetailTrailer;
