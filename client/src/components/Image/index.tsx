import { useState } from 'react';
import { default as NextImage } from 'next/image';

// material ui icons
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';

// clsx
import clsx from 'clsx';

// types
import { ImageProps } from 'next/image';

function Image(props: ImageProps) {
  const { src, ...rest } = props;

  const [isError, setIsError] = useState<boolean>(false);

  return (
    <>
      {isError ? (
        <div className={clsx('i-flex-center w-full h-full')}>
          <MovieOutlinedIcon className={clsx('!text-4xl', 'text-gray')} />
        </div>
      ) : (
        <NextImage src={src} {...rest} onError={() => setIsError(true)} />
      )}
    </>
  );
}

export default Image;
