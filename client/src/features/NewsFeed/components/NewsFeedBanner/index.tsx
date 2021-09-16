// clsx
import clsx from 'clsx';

// material ui icons
import SpeakerPhoneIcon from '@material-ui/icons/SpeakerPhone';

import { bannerShape, bannerMembers } from '@/utils/imagesNewFeed';

function NewsFeedBanner() {
  return (
    <section
      className={clsx(
        'relative',
        'flex items-center justify-center md:justify-start py-12 lg:h-newsfeed-banner-h rounded-2xl md:px-14',
        'bg-gradient-to-r from-yellow-400 to-yellow-300'
      )}>
      <div className={clsx('hidden md:i-flex-center w-20 h-20 mr-4')}>
        <SpeakerPhoneIcon className={clsx('!w-full !h-full', 'text-white')} />
      </div>

      <div className={clsx('relative', 'text-center md:text-left md:pl-6')}>
        <h1
          className={clsx(
            'text-2xl lg:text-3xl font-bold leading-none',
            'text-white'
          )}>
          Members Newsfeed
        </h1>
        <p className={clsx('text-sm mt-4', 'text-white')}>
          Check what your friends have been up to!
        </p>
        <span
          className={clsx(
            'absolute left-0 top-0',
            'hidden md:block w-1 h-full rounded-2xl',
            'bg-white'
          )}
        />
      </div>

      <div className={clsx('absolute right-0 lg:right-16 top-0', 'h-full')}>
        <img
          src={bannerShape}
          alt='Shape'
          className={clsx('h-full object-cover')}
        />
      </div>
      <div
        className={clsx(
          'absolute right-4 bottom-0',
          'hidden lg:block h-full pt-7'
        )}>
        <img src={bannerMembers} alt='Members' className={clsx('h-full')} />
      </div>
    </section>
  );
}

export default NewsFeedBanner;
