// clsx
import clsx from 'clsx';

// material ui icons
import RssFeedIcon from '@mui/icons-material/RssFeed';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

function WidgetsIntro() {
  return (
    <div
      className={clsx(
        'px-3 py-4 rounded-lg shadow-md dark:shadow-xl',
        'bg-white dark:bg-dk-cpn'
      )}>
      <h2 className={clsx('text-base font-bold', 'dark:text-white')}>Intro</h2>
      <ul className={clsx('mt-4')}>
        <li className={clsx('flex items-center')}>
          <WatchLaterIcon className={clsx('dark:text-gray')} />
          <div className={clsx('ml-1')}>
            <span className={clsx('text-sm-1', 'dark:text-white')}>
              Joined November 2017
            </span>
          </div>
        </li>
        <li className={clsx('flex items-center mt-2')}>
          <RssFeedIcon className={clsx('dark:text-gray')} />
          <div className={clsx('ml-1')}>
            <span className={clsx('text-sm-1', 'dark:text-white')}>
              Followed by{' '}
              <strong
                className={clsx(
                  'text-sm-1',
                  'cursor-pointer',
                  'hover:underline'
                )}>
                1000 people
              </strong>
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default WidgetsIntro;
