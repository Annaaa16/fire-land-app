import { useEffect, useState, useRef } from 'react';

// clsx
import clsx from 'clsx';

// material ui icons
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';

// overlayscrollbars
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

// types
import { FormEvent } from 'react';
import { Product } from '@/models/common';

// enums
import { ViewOptions } from '.';

import { LIMITS } from '@/constants';
import { actions, reviewsActions } from '@/redux/slices/reviewsSlice';
import { useReviewsSelector, useUsersSelector } from '@/redux/selectors';
import useStoreDispatch from '@/hooks/useStoreDispatch';
import useAutoFocus from '@/hooks/useAutoFocus';
import useUsers from '@/hooks/useUsers';

import User from '@/components/User';
import Tooltip from '@/components/Tooltip';
import CheckoutReview from './CheckoutReview';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

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
  const scrollRef = useRef<OverlayScrollbarsComponent>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const dispatch = useStoreDispatch();

  const { visitWall } = useUsers();
  useAutoFocus(inputRef);

  const handleCreateReview = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const scrollNode = scrollRef.current?.osInstance()?.getElements('viewport');

    dispatch(
      reviewsActions.createReviewRequest({
        content,
        productId,
      })
    );
    setContent('');
    scrollNode.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isIntersecting = useIntersectionObserver(loaderRef, '0px');

  useEffect(() => {
    const isLoading = loadings.includes(actions.getReviews);

    if (isIntersecting && nextPage && !isLoading) {
      dispatch(
        reviewsActions.getReviewsRequest({
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
      <OverlayScrollbarsComponent
        ref={scrollRef}
        options={{
          scrollbars: { autoHide: 'scroll', clickScrolling: true },
        }}
        className={clsx('relative', 'flex-grow md:h-100 pr-3')}>
        <div ref={containerRef} className='flex flex-col gap-y-2 pt-2'>
          {reviews.map((review) => (
            <CheckoutReview key={review._id} {...review} />
          ))}
          <div ref={loaderRef} className='h-px' />
        </div>
      </OverlayScrollbarsComponent>

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
          'bg-gray-100',
          'cursor-pointer',
          'transition-all',
          'hover:bg-gray-200'
        )}>
        <LogoutIcon className={clsx('text-gray', 'rotate-180')} />
      </div>
    </div>
  );
}

export default CheckoutReviewList;
