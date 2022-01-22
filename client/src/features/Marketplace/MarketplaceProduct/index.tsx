// clsx
import clsx from 'clsx';

// material ui icons
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';

// types
import { Product } from '@/models/common';

import { LIMITS } from '@/constants';
import { reviewActions } from '@/redux/slices/reviewsSlice';
import { useUsersSelector } from '@/redux/selectors';
import { productActions } from '@/redux/slices/productsSlice';
import useStoreDispatch from '@/hooks/useStoreDispatch';

import User from '@/components/User';
import Image from '@/components/Image';
import ProductOptions from './ProductOptions';

function MarketplaceProduct(props: Product) {
  const {
    _id: productId,
    user,
    photo,
    name,
    reactions,
    price,
    sold,
    category,
  } = props;

  const { currentUser } = useUsersSelector();
  const dispatch = useStoreDispatch();

  const isReacted = reactions.includes(currentUser._id);
  const soldCount = sold.reduce((acc, cur) => acc + cur.count, 0);

  const handleReactProduct = () => {
    dispatch(
      productActions.reactProductRequest({
        currentUserId: currentUser._id,
        isReact: !isReacted,
        productId,
        category,
      })
    );
  };

  const handleOpenCheckout = () => {
    dispatch(
      reviewActions.getReviewsRequest({
        productId,
        params: {
          page: 1,
          limit: LIMITS.REVIEWS,
        },
      })
    );
    dispatch(productActions.setCheckoutProduct(props));
    dispatch(productActions.setIsOpenCheckout(true));
  };

  return (
    <div
      className={clsx(
        'px-3 pt-5 rounded-xl shadow-md',
        'bg-white dark:bg-dk-cpn',
        'transition-all ease-out',
        'hover:shadow-xl'
      )}>
      <div className={clsx('flex-between mb-3')}>
        <div className={clsx('flex items-center', 'cursor-pointer')}>
          <User
            className={clsx('w-6 h-6 mr-1.5')}
            rounded
            avatar={user?.avatar}
          />
          <span
            className={clsx(
              'text-xs font-semibold',
              'dark:text-white',
              'lg:hover:underline'
            )}>
            @{user?.username}
          </span>
        </div>
        <div
          className={clsx(
            'relative',
            'group flex items-center',
            'cursor-pointer'
          )}>
          <MoreVertOutlinedIcon
            className={clsx(
              '!text-2xl',
              'text-gray dark:text-gray-400',
              'hover:!text-gray-400 dark:hover:!text-gray-400'
            )}
          />
          <ProductOptions product={props} user={user} />
        </div>
      </div>

      <div className={clsx('rounded-lg h-64 overflow-hidden')}>
        <Image
          src={photo}
          alt='Product'
          layout='fill'
          className={clsx(
            'cursor-pointer',
            'transition-all duration-250 ease-in-out'
          )}
          objectFit='cover'
          styleLoading='image'
          skeleton
          onClick={handleOpenCheckout}
        />
      </div>

      <div className={clsx('flex-between mt-3')}>
        <div
          onClick={handleOpenCheckout}
          title={name}
          className={clsx(
            'truncate font-semibold text-base leading-tight mr-2',
            'dark:text-white',
            'cursor-pointer',
            'hover:!underline'
          )}>
          {name}
        </div>
        <div
          onClick={handleReactProduct}
          className={clsx(
            'group flex items-center py-0.5 px-2.5 rounded-full',
            'bg-white dark:bg-dk-cpn',
            'cursor-pointer'
          )}>
          {isReacted ? (
            <FavoriteIcon className={clsx('mr-1', 'text-red-400')} />
          ) : (
            <FavoriteBorderIcon
              className={clsx(
                'mr-1',
                'text-red-400',
                '!transition-all',
                'lg:group-hover:scale-110'
              )}
            />
          )}
          <span
            className={clsx(
              'font-semibold text-xs leading-none',
              'dark:text-white',
              'select-none'
            )}>
            {reactions.length}
          </span>
        </div>
      </div>

      <div
        className={clsx(
          'flex-between py-3 mt-3 border-t border-lt-line dark:border-dk-line'
        )}>
        <span
          className={clsx(
            'font-semibold truncate mr-6 text-sm-1',
            'text-gray-400',
            'cursor-pointer select-none',
            'lg:hover:underline'
          )}>
          {soldCount} sold
        </span>
        <span
          className={clsx(
            'font-bold text-lg truncate',
            'text-primary-v1 dark:text-primary-v4'
          )}>
          ${price}
        </span>
      </div>
    </div>
  );
}

export default MarketplaceProduct;
