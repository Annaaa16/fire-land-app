// clsx
import clsx from 'clsx';

function LoadingCover() {
  return (
    <div
      className={clsx(
        'relative',
        'w-full h-full rounded-lg overflow-hidden dark:opacity-25',
        'bg-[#dddbdd]',
        'animate-pulse'
      )}>
      <span className='skeleton' />
    </div>
  );
}

export default LoadingCover;
