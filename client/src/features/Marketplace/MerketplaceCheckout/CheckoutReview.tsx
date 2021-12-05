// clsx
import clsx from 'clsx';

// react timeago
import Timeago from 'react-timeago';

// types
import { Review } from '@/models/common';

import useUsers from '@/hooks/useUsers';

import User from '@/components/User';

function CheckoutReview({ user, content, createdAt }: Review) {
  const { visitWall } = useUsers();

  return (
    <div className={clsx('flex')}>
      <User
        onClick={() => visitWall(user._id)}
        view='sm'
        className='mr-2'
        rounded
      />
      <div className={clsx('flex-grow')}>
        <div
          className={clsx(
            'mb-1 px-3 py-2 rounded-xl',
            'bg-lt-input dark:bg-dk-input'
          )}>
          <h4
            onClick={() => visitWall(user._id)}
            className={clsx(
              'inline-block font-semibold mb-1.5 text-xs lg:text-sm-1 leading-4',
              'dark:text-white',
              'cursor-pointer',
              'hover:underline'
            )}>
            @{user.username}
          </h4>
          <p
            className={clsx(
              'leading-4 text-xs lg:text-sm-1',
              'dark:text-white'
            )}>
            {content}
          </p>
        </div>
        <div className={clsx('flex items-center ml-3')}>
          <Timeago
            live={false}
            date={createdAt}
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
  );
}

export default CheckoutReview;
