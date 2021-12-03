import { nanoid } from '@reduxjs/toolkit';

// clsx
import clsx from 'clsx';

interface LoadingImageProps {
  loadingWidths?: number[];
  loadingHeight?: number;
  skeleton?: boolean;
}

function LoadingImage({
  loadingWidths,
  loadingHeight,
  skeleton,
}: LoadingImageProps) {
  return (
    <div
      className={clsx('flex-1 w-full h-full space-y-2 py-1', 'animate-pulse')}>
      {(loadingWidths ?? [85, 20, 30, 40, 65]).map((width) => (
        <div
          key={nanoid(6)}
          className={clsx(
            'relative',
            'rounded overflow-hidden dark:opacity-25',
            'bg-[#dddbdd]'
          )}
          style={{
            width: width + '%',
            height: loadingHeight ? loadingHeight + 'px' : '16px',
          }}>
          {skeleton && <span className='skeleton' />}
        </div>
      ))}
    </div>
  );
}

export default LoadingImage;
