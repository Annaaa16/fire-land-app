import { useState } from 'react';
import { default as NextImage } from 'next/image';

// nanoid
import { nanoid } from 'nanoid';

// material ui icons
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';

// clsx
import clsx from 'clsx';

// types
import { ImageProps } from 'next/image';

function Image(
  props: ImageProps & { widths?: number[]; height?: number; subClass?: string }
) {
  const { src, widths, height, subClass, ...rest } = props;

  const [isError, setIsError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <>
      {!isError ? (
        <NextImage
          src={src}
          {...rest}
          onError={() => setIsError(true)}
          onLoad={() => setIsLoaded(false)}
          onLoadingComplete={() => setIsLoaded(true)}
          className={clsx(
            isLoaded && !isError
              ? 'opacity-100 visible'
              : 'opacity-0 invisible',
            subClass
          )}
        />
      ) : (
        <div className={clsx('i-flex-center w-full h-full')}>
          <MovieOutlinedIcon className={clsx('!text-4xl', 'text-gray')} />
        </div>
      )}
      {!isLoaded && !isError && (
        <div className='h-full w-full'>
          <div className='animate-pulse flex space-x-4'>
            <div className='flex-1 space-y-2 py-1'>
              {(widths || [85, 20, 30, 40, 65]).map((width) => (
                <div
                  key={nanoid(6)}
                  className={clsx('rounded', 'bg-gray-700')}
                  style={{
                    width: width + '%',
                    height: height ? height + 'px' : '16px',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Image;
