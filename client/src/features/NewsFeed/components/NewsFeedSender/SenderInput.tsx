// clsx
import clsx from 'clsx';

// material ui icons
import VideoCallIcon from '@mui/icons-material/VideoCall';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

import User from '@/components/User';

function NewsFeedSenderInput() {
  return (
    <div
      className={clsx(
        'shadow-lg rounded-lg pt-4 px-2 md:px-4',
        'bg-lt-cpn dark:bg-dk-cpn'
      )}>
      <div className={clsx('flex items-center')}>
        <User view='small' subClass={clsx('ml-1 md:ml-0')} />
        <input
          placeholder={`What's on your mind, IG Dev`}
          className={clsx(
            'flex-1 h-full ml-3 md:ml-4 rounded-full text-xs md:text-sm outline-none px-4 py-3',
            'bg-[#f0f2f5] dark:bg-dk-input dark:text-white',
            'cursor-pointer'
          )}
          value=''
        />
      </div>

      <ul
        className={clsx(
          'flex mt-5 py-2 border-t border-lt-line dark:border-dk-line'
        )}>
        <li
          className={clsx(
            'hidden md:i-flex-center flex-1 py-2.5 rounded-lg',
            'cursor-pointer',
            'transition-all ease-out',
            'lg:hover:bg-lt-input lg:dark:hover:bg-dk-tooltip-hv'
          )}>
          <VideoCallIcon
            className={clsx('mr-1.5 !text-2xl', 'text-[#f02849]')}
          />
          <span className={clsx('font-bold dark:text-white')}>Live Video</span>
        </li>
        <li
          className={clsx(
            'i-flex-center flex-1 py-2.5 rounded-lg',
            'cursor-pointer',
            'transition-all ease-out',
            'lg:hover:bg-lt-input lg:dark:hover:bg-dk-tooltip-hv'
          )}>
          <PhotoLibraryIcon
            className={clsx('mr-1.5 text-xl md:!text-2xl', 'text-[#45bd62]')}
          />
          <span
            className={clsx('text-xs lg:text-sm font-bold dark:text-white')}>
            Photo
          </span>
        </li>
        <li
          className={clsx(
            'i-flex-center flex-1 py-2.5 rounded-lg',
            'cursor-pointer',
            'transition-all ease-out',
            'lg:hover:bg-lt-input lg:dark:hover:bg-dk-tooltip-hv'
          )}>
          <SentimentVerySatisfiedIcon
            className={clsx('mr-1.5 text-xl md:!text-2xl', 'text-[#f7b928]')}
          />
          <span
            className={clsx('text-xs lg:text-sm font-bold dark:text-white')}>
            Feeling
          </span>
        </li>
      </ul>
    </div>
  );
}

export default NewsFeedSenderInput;
