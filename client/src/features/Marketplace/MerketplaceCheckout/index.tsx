import { useState } from 'react';

// clsx
import clsx from 'clsx';

import { productsActions } from '@/redux/slices/productsSlice';
import { reviewsActions } from '@/redux/slices/reviewsSlice';
import { useProductsSelector } from '@/redux/selectors';
import useStoreDispatch from '@/hooks/useStoreDispatch';

import CheckoutDetail from './CheckoutDetail';
import CheckoutReviewList from './CheckoutReviewList';
import Image from '@/components/Image';

export enum ViewOptions {
  DETAIL = 'detail',
  REVIEWS = 'reviews',
}

function MarketplaceCheckout() {
  const { checkoutProduct, categories } = useProductsSelector();

  const { DETAIL, REVIEWS } = ViewOptions;

  const [option, setOption] = useState<ViewOptions>(DETAIL);

  const dispatch = useStoreDispatch();

  if (!checkoutProduct) return null;

  const selectedProduct = categories[checkoutProduct.category].find(
    (product) => product._id === checkoutProduct._id
  )!;

  const handleCloseModal = () => {
    dispatch(productsActions.setIsOpenCheckout(false));
    dispatch(reviewsActions.clearReviews());
  };

  const handleSelectOption = (value: ViewOptions) => {
    setOption(value);
  };

  return (
    <div className={clsx('fixed inset-0 z-50', 'flex px-4 md:px-0')}>
      <div onClick={handleCloseModal} className='modal' />
      <div
        className={clsx(
          'relative',
          'flex flex-col md:flex-row m-auto w-[980px] h-[75vh] md:h-[500px] rounded-xl overflow-hidden shadow-box',
          'bg-white dark:bg-dk-cpn'
        )}>
        <div className={clsx('h-2/5 md:h-auto md:w-1/2')}>
          <Image
            src={selectedProduct?.photo || ''}
            alt='Thumbnail'
            className={clsx('img-cover')}
            styleLoading='cover'
            layout='fill'
          />
        </div>

        <div className={clsx('h-3/5 md:h-auto md:w-1/2')}>
          {option === DETAIL && (
            <CheckoutDetail
              {...selectedProduct}
              onSelectOption={handleSelectOption}
            />
          )}
          {option === REVIEWS && (
            <CheckoutReviewList
              {...selectedProduct}
              onSelectOption={handleSelectOption}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MarketplaceCheckout;
