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
        'shadow-lg rounded-lg pt-4 px-4',
        'bg-lt-cpn dark:bg-dk-cpn'
      )}>
      <div className={clsx('flex items-center')}>
        <User view='small' />
        <input
          placeholder={`What's on your mind, IG Dev`}
          className={clsx(
            'flex-1 h-full ml-4 rounded-full outline-none px-4 py-3',
            'bg-[#f0f2f5] dark:bg-[#21283B] dark:text-white',
            'cursor-pointer'
          )}
        />
      </div>

      <ul
        className={clsx(
          'flex mt-5 py-2 border-t border-lt-line dark:border-dk-line'
        )}>
        <li
          className={clsx(
            'i-flex-center flex-1 py-2.5 rounded-lg',
            'cursor-pointer',
            'transition-all ease-out',
            'hover:bg-[#f2f2f2] dark:hover:bg-dk-tooltip-hv'
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
            'hover:bg-[#f2f2f2] dark:hover:bg-dk-tooltip-hv'
          )}>
          <PhotoLibraryIcon
            className={clsx('mr-1.5 !text-2xl', 'text-[#45bd62]')}
          />
          <span className={clsx('font-bold dark:text-white')}>Photo</span>
        </li>
        <li
          className={clsx(
            'i-flex-center flex-1 py-2.5 rounded-lg',
            'cursor-pointer',
            'transition-all ease-out',
            'hover:bg-[#f2f2f2] dark:hover:bg-dk-tooltip-hv'
          )}>
          <SentimentVerySatisfiedIcon
            className={clsx('mr-1.5 !text-2xl', 'text-[#f7b928]')}
          />
          <span className={clsx('font-bold dark:text-white')}>Feeling</span>
        </li>
      </ul>
    </div>
  );
}

export default NewsFeedSenderInput;
