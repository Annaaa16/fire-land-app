// clsx
import clsx from 'clsx';

interface LoadingImageProps {
  loadingWidths?: number[];
  loadingHeight?: number;
  skeleton?: boolean;
  skeletonClass?: string;
}

function LoadingImage({
  loadingWidths,
  loadingHeight,
  skeleton,
  skeletonClass,
}: LoadingImageProps) {
  return (
    <div
      className={clsx('flex-1 w-full h-full space-y-2 py-1', 'animate-pulse')}>
      {(loadingWidths ?? [85, 20, 30, 40, 65]).map((width, idx) => (
        <div
          key={'loading-image' + idx}
          className={clsx(
            'relative',
            'rounded overflow-hidden dark:opacity-20',
            'bg-skeleton',
            skeletonClass
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
