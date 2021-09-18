// clsx
import clsx from 'clsx';

// material ui icons
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import FlagIcon from '@mui/icons-material/Flag';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import CloseIcon from '@mui/icons-material/Close';

import User from '@/components/User';
import Tooltip from '@/components/Tooltip';

function NewsFeedSenderArea() {
  return (
    <div className={clsx('fixed inset-0 z-50', 'flex px-4 md:px-0')}>
      <div
        className={clsx(
          'absolute inset-0',
          'w-full h-full',
          'bg-gray-900 opacity-80'
        )}
      />
      <div
        className={clsx(
          'relative',
          'm-auto w-[500px] h-auto rounded-xl shadow-lg',
          'bg-white dark:bg-dk-cpn'
        )}>
        <div className={clsx('relative')}>
          <h2
            className={clsx(
              'font-bold text-xl text-center py-5 leading-none border-b border-lt-line dark:border-dk-line',
              'dark:text-white'
            )}>
            Create Post
          </h2>
          <div
            className={clsx(
              'absolute top-1/2 right-4',
              'rounded-full p-2 -translate-y-1/2',
              'bg-gray-200 dark:bg-dk-tooltip-hv lg:dark:bg-dk-cpn-lt',
              'transition-all ease-out',
              'hover:bg-gray-300 dark:hover:bg-dk-tooltip-hv',
              'cursor-pointer'
            )}>
            <CloseIcon className={clsx('dark:text-gray-400')} />
          </div>
        </div>
        <div className={clsx('p-3')}>
          <div className={clsx('flex items-center mt-2 ml-2')}>
            <User view='small' />
            <div className={clsx('ml-5')}>
              <span className={clsx('font-bold', 'dark:text-white')}>
                IG Dev
              </span>
              <div
                className={clsx(
                  'flex items-center mt-1.5 px-2 py-1 rounded-md',
                  'bg-gray-200 dark:bg-dk-tooltip-hv lg:dark:bg-dk-cpn-lt',
                  'transition-all ease-out',
                  'cursor-pointer',
                  'hover:bg-gray-300 dark:hover:bg-dk-tooltip-hv'
                )}>
                <span
                  className={clsx(
                    'text-xs mr-1 font-bold',
                    'dark:text-gray-500'
                  )}>
                  People
                </span>
                <PeopleIcon
                  className={clsx('!text-base', 'dark:text-gray-500')}
                />
              </div>
            </div>
          </div>
          <div className={clsx('relative')}>
            <textarea
              className={clsx(
                'h-40 w-full pt-8 outline-none resize-none',
                'dark:bg-dk-cpn dark:text-white'
              )}
              placeholder='What"s on your mind, IG Dev?'
            />
            <div
              className={clsx(
                'absolute bottom-3 right-2',
                'group',
                'cursor-pointer'
              )}>
              <SentimentSatisfiedIcon
                fontSize='large'
                className={clsx(
                  'text-gray-300 dark:text-gray-300 lg:dark:text-gray-500',
                  '!transition-all',
                  'hover:text-gray-400 dark:hover:text-white'
                )}
              />
              <Tooltip title='Emoji' direction='ttb' />
            </div>
          </div>
          <div
            className={clsx(
              'flex items-center justify-center md:justify-between px-4 py-3 rounded-full border border-lt-line dark:border-dk-line'
            )}>
            <span
              className={clsx(
                'hidden md:block',
                'dark:text-white',
                'select-none'
              )}>
              Add to your post
            </span>
            <div className={clsx('flex items-center')}>
              <div
                className={clsx('relative', 'group px-2.5', 'cursor-pointer')}>
                <PhotoLibraryIcon
                  className={clsx('!text-2xl', 'text-[#45bd62]')}
                />
                <Tooltip title='Photo' direction='ttb' />
              </div>
              <div
                className={clsx('relative', 'group px-2.5', 'cursor-pointer')}>
                <PersonAddIcon
                  className={clsx('!text-2xl', 'text-[#1877f2]')}
                />
                <Tooltip title='Tag People' direction='ttb' />
              </div>
              <div
                className={clsx('relative', 'group px-2.5', 'cursor-pointer')}>
                <SentimentVerySatisfiedIcon
                  className={clsx('!text-2xl', 'text-[#f7b928]')}
                />
                <Tooltip title='Feeling' direction='ttb' />
              </div>
              <div
                className={clsx('relative', 'group px-2.5', 'cursor-pointer')}>
                <EditLocationAltIcon
                  className={clsx('!text-2xl', 'text-[#f5533d]')}
                />
                <Tooltip title='Check In' direction='ttb' />
              </div>
              <div
                className={clsx('relative', 'group px-2.5', 'cursor-pointer')}>
                <FlagIcon className={clsx('!text-2xl', 'text-[#39afd5]')} />
                <Tooltip title='Life Event' direction='ttb' />
              </div>
            </div>
          </div>
          <button
            className={clsx(
              'mt-4 py-3.5 w-full font-bold rounded-lg',
              'text-white bg-primary-v1 dark:bg-primary-v3',
              'transition-all',
              'hover:bg-primary-v1-hv dark:hover:bg-primary-v3-hv'
            )}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewsFeedSenderArea;
