// clsx
import clsx from 'clsx';

// material ui icons
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import time from '@/helpers/time';

function MoviesFooter() {
  return (
    <footer className={clsx('pb-10 mt-28')}>
      <div className={clsx('flex items-center justify-center mb-2')}>
        <div className={clsx('group px-2', 'cursor-pointer')}>
          <InstagramIcon
            className={clsx(
              'text-gray-300',
              'transition-all !duration-300 ease-out',
              'cursor-pointer',
              'group-hover:text-primary-v4-hv'
            )}
          />
        </div>
        <div className={clsx('group px-2', 'cursor-pointer')}>
          <YouTubeIcon
            className={clsx(
              'text-gray-300',
              'transition-all !duration-300 ease-out',
              'cursor-pointer',
              'group-hover:text-primary-v4-hv'
            )}
          />
        </div>
        <div className={clsx('group px-2', 'cursor-pointer')}>
          <FacebookIcon
            className={clsx(
              'text-gray-300',
              'transition-all !duration-300 ease-out',
              'cursor-pointer',
              'group-hover:text-primary-v4-hv'
            )}
          />
        </div>
        <div className={clsx('group px-2', 'cursor-pointer')}>
          <LinkedInIcon
            className={clsx(
              'text-gray-300',
              'transition-all !duration-300 ease-out',
              'cursor-pointer',
              'group-hover:text-primary-v4-hv'
            )}
          />
        </div>
      </div>
      <div className={clsx('text-center text-xs', 'text-gray-300')}>
        © {time.getCurrentYear()} Fire Land, Inc
      </div>
    </footer>
  );
}

export default MoviesFooter;
