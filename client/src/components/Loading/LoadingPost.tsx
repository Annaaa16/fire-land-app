// clsx
import clsx from 'clsx';

function LoadingPost() {
  function Skeleton({ className }: { className: string }) {
    return (
      <div
        className={clsx(
          'relative',
          'h-4 w-1/4 rounded overflow-hidden dark:opacity-25',
          'bg-skeleton',
          className
        )}>
        <span className='skeleton' />
      </div>
    );
  }

  return (
    <div className={clsx('w-full h-80 mt-7 rounded-lg p-4 shadow-md')}>
      <div className={clsx('flex space-x-2 items-center mb-5')}>
        <Skeleton className='w-1/6' />
        <Skeleton className='w-1/12' />
      </div>
      <div className={clsx('flex items-center space-x-3 mb-5')}>
        <Skeleton className='w-1/5' />
        <Skeleton className='w-2/12' />
        <Skeleton className='w-4/12' />
        <Skeleton className='w-1/12' />
      </div>
      <div className={clsx('flex items-center space-x-3')}>
        <Skeleton className='w-1/12' />
        <Skeleton className='w-1/12' />
      </div>
    </div>
  );
}

export default LoadingPost;
