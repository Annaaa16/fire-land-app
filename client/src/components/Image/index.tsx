import { useState } from 'react';
import NextImage from 'next/image';

// material ui icons
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';

// clsx
import clsx from 'clsx';

// types
import { ImageProps as NextImageProps } from 'next/image';

import LoadingImage from '../Loading/LoadingImage';
import LoadingCover from '../Loading/LoadingCover';

interface ImageProps {
  className?: string;
  loadingWidths?: number[];
  loadingHeight?: number;
  skeleton?: boolean;
  styleLoading: 'cover' | 'image';
}

function Image(props: NextImageProps & ImageProps) {
  const {
    src,
    styleLoading,
    loadingWidths,
    loadingHeight,
    skeleton,
    className,
    ...rest
  } = props;

  const [isError, setIsError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <>
      {!isError ? (
        <div className={clsx('relative', 'w-full h-full')}>
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
              className
            )}
            draggable={false}
          />
          {!isLoaded && !isError && (
            <>
              {styleLoading === 'image' ? (
                <LoadingImage
                  loadingWidths={loadingWidths}
                  loadingHeight={loadingHeight}
                  skeleton={skeleton}
                />
              ) : (
                <LoadingCover />
              )}
            </>
          )}
        </div>
      ) : (
        <div className={clsx('flex-center w-full h-full')}>
          <MovieOutlinedIcon className={clsx('!text-4xl', 'text-gray')} />
        </div>
      )}
    </>
  );
}

export default Image;
