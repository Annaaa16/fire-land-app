import { useEffect, useState, useRef } from 'react';

// clsx
import clsx from 'clsx';

// material ui icons
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';

// types
import { FormEvent } from 'react';
import { Product } from '@/models/common';

// enums
import { ViewOptions } from '.';

import { LIMITS } from '@/constants';
import { actions, reviewActions } from '@/redux/slices/reviewsSlice';
import { useReviewsSelector, useUsersSelector } from '@/redux/selectors';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useStoreDispatch from '@/hooks/useStoreDispatch';
import useAutoFocus from '@/hooks/useAutoFocus';
import useUsers from '@/hooks/useUsers';

import { Scrollbar } from '@/components/Scrollbar';
import User from '@/components/User';
import Tooltip from '@/components/Tooltip';
import CheckoutReview from './CheckoutReview';

interface CheckoutReviewListProps extends Product {
  onSelectOption: (option: ViewOptions) => void;
}

function CheckoutReviewList({
  _id: productId,
  onSelectOption,
}: CheckoutReviewListProps) {
  const { reviews, nextPage, loadings } = useReviewsSelector();
  const { currentUser } = useUsersSelector();

  const [content, setContent] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const dispatch = useStoreDispatch();

  const { visitWall } = useUsers();
  useAutoFocus(inputRef);

  const handleCreateReview = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      reviewActions.createReviewRequest({
        content,
        productId,
      })
    );
    setContent('');
  };

  const isIntersecting = useIntersectionObserver(loaderRef, '0px');

  useEffect(() => {
    const isLoading = loadings.includes(actions.getReviews);

    if (isIntersecting && nextPage && !isLoading) {
      dispatch(
        reviewActions.getReviewsRequest({
          productId,
          params: {
            page: nextPage,
            limit: LIMITS.POSTS,
          },
        })
      );
    }
  }, [productId, isIntersecting, dispatch, nextPage, loadings]);

  return (
    <div
      className={clsx(
        'relative',
        'flex flex-col justify-between h-full pl-2 pr-0.5'
      )}>
      <Scrollbar className={clsx('flex-grow md:h-100')}>
        <div ref={containerRef} className='flex flex-col gap-y-2 pt-2 pr-3'>
          {reviews.map((review) => (
            <CheckoutReview key={review._id} {...review} />
          ))}
          <div ref={loaderRef} className='h-px' />
        </div>
      </Scrollbar>

      <form
        onSubmit={handleCreateReview}
        className={clsx(
          'flex items-center px-2 border-t -mr-0.5 mt-auto border-lt-line dark:border-dk-line',
          'bg-white dark:bg-dk-input'
        )}>
        <User
          onClick={() => visitWall(currentUser._id)}
          className={clsx('w-8 h-8 mr-2')}
          rounded
          avatar={currentUser.avatar}
        />
        <input
          ref={inputRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder='Write your reviews...'
          className={clsx('flex-grow py-4.5', 'bg-transparent dark:text-white')}
        />
        <button
          type='submit'
          className={clsx('relative', 'group px-2', 'cursor-pointer')}>
          <SendIcon
            className={clsx(
              '!text-2xl -rotate-45',
              'text-primary-v1 dark:text-primary-v4',
              'hover:text-primary-v1-hv dark:hover:text-primary-v4-hv'
            )}
          />
          <Tooltip title='Send' direction='ttb' />
        </button>
      </form>

      <div
        onClick={() => onSelectOption(ViewOptions.DETAIL)}
        className={clsx(
          'absolute right-2 bottom-17',
          'flex-center rounded-full p-3 shadow-lg',
          'bg-gray-100 dark:bg-dk-tooltip',
          'cursor-pointer',
          'transition-all',
          'hover:bg-gray-200 dark:hover:bg-gray-800'
        )}>
        <LogoutIcon className={clsx('rotate-180', 'text-gray')} />
      </div>
    </div>
  );
}

export default CheckoutReviewList;
