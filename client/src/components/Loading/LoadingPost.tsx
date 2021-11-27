import clsx from 'clsx';

function LoadingPost() {
  return (
    <div className={clsx('w-full h-80 mt-7 rounded-lg p-4 shadow-md')}>
      <div className={clsx('flex items-center mb-5')}>
        <Skeleton className='w-1/4' />
        <div className={clsx('flex items-center space-x-2')}>
          <Skeleton className='w-7' />
          <Skeleton className='w-7' />
        </div>
      </div>
      <div className={clsx('flex items-center space-x-3')}>
        <Skeleton className='w-1/5' />
        <Skeleton className='w-2/12' />
        <Skeleton className='w-1/12' />
        <Skeleton className='w-5/12' />
        <Skeleton className='w-1/12' />
      </div>
      <div className={clsx('flex items-center space-x-3')}></div>
      <div className={clsx('flex items-center space-x-3')}>
        <Skeleton className='w-1/12' />
        <Skeleton className='w-1/12' />
      </div>
    </div>
  );
}

export default LoadingPost;

function Skeleton({ className }: { className: string }) {
  return (
    <div
      className={clsx(
        'relative',
        'h-4 w-1/4 rounded overflow-hidden dark:opacity-25',
        'bg-[#dddbdd]',
        className
      )}>
      <span className='skeleton' />
    </div>
  );
}
