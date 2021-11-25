// clsx
import clsx from 'clsx';

// material ui icons
import SendIcon from '@mui/icons-material/Send';

// react timeago
import Timeago from 'react-timeago';

// overlayscrollbars
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import User from '@/components/User';
import Tooltip from '@/components/Tooltip';

function CheckoutReviews() {
  return (
    <div className={clsx('relative', 'h-full pl-2 pr-1 pt-2 md:pb-16')}>
      <OverlayScrollbarsComponent
        options={{
          scrollbars: { autoHide: 'scroll', clickScrolling: true },
        }}
        className={clsx('relative', 'h-60 md:h-100 pr-4 md:pt-0')}>
        <div className={clsx('flex mb-2')}>
          <User view='sm' className='mr-2' rounded />
          <div className={clsx('flex-grow')}>
            <div
              className={clsx(
                'mb-1 px-3 py-2 rounded-xl',
                'bg-lt-input dark:bg-dk-input'
              )}>
              <h4
                className={clsx(
                  'inline-block font-semibold mb-1.5 text-xs lg:text-sm-1 leading-4',
                  'dark:text-white',
                  'cursor-pointer',
                  'hover:underline'
                )}>
                @igdev
              </h4>
              <p
                className={clsx(
                  'leading-4 text-xs lg:text-sm-1',
                  'dark:text-white'
                )}>
                This is content
              </p>
            </div>
            <div className={clsx('flex items-center ml-3')}>
              <Timeago
                live={false}
                date={1637815137371}
                className={clsx(
                  'text-xs',
                  'cursor-pointer',
                  'dark:text-gray',
                  'hover:underline'
                )}
              />
            </div>
          </div>
        </div>
      </OverlayScrollbarsComponent>

      <div
        className={clsx(
          'absolute bottom-0 left-0 right-0 z-10',
          'flex items-center px-2 border-t border-lt-line dark:border-dk-line',
          'bg-white dark:bg-dk-input'
        )}>
        <User className={clsx('w-8 h-8 mr-2')} rounded />
        <input
          placeholder='Write your reviews...'
          className={clsx('flex-grow py-4.5', 'bg-transparent dark:text-white')}
        />
        <div className={clsx('relative', 'group px-2', 'cursor-pointer')}>
          <SendIcon
            className={clsx(
              '!text-2xl -rotate-45',
              'text-primary-v1 dark:text-primary-v4',
              'hover:text-primary-v1-hv dark:hover:text-primary-v4-hv'
            )}
          />
          <Tooltip title='Send' direction='ttb' />
        </div>
      </div>
    </div>
  );
}

export default CheckoutReviews;
