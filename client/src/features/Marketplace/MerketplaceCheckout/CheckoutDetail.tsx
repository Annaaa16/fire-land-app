// clsx
import clsx from 'clsx';

// material ui icons
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ForumIcon from '@mui/icons-material/Forum';
import HandymanIcon from '@mui/icons-material/Handyman';
import StoreIcon from '@mui/icons-material/Store';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import ChatIcon from '@mui/icons-material/Chat';
import FavoriteIcon from '@mui/icons-material/Favorite';

// types
import { Product } from '@/models/common';

// enums
import { ViewOptions } from '.';

import { useReviewsSelector, useUsersSelector } from '@/redux/selectors';
import { productActions } from '@/redux/slices/productsSlice';
import useStoreDispatch from '@/hooks/useStoreDispatch';
import useUsers from '@/hooks/useUsers';

import Avatar from '@/components/Avatar';

interface CheckoutDetailProps extends Product {
  onSelectOption: (option: ViewOptions) => void;
}

function CheckoutDetail(props: CheckoutDetailProps) {
  const {
    _id: productId,
    name,
    user,
    desc,
    category,
    reactions,
    price,
    onSelectOption,
  } = props;

  const { currentUser } = useUsersSelector();
  const { total } = useReviewsSelector();

  const { visitWall } = useUsers();
  const dispatch = useStoreDispatch();

  const isReacted = reactions.includes(currentUser._id);

  const handleBuyProduct = () => {
    dispatch(productActions.buyProductRequest({ productId }));
    dispatch(productActions.setIsOpenCheckout(false));
  };

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

  return (
    <div className='flex flex-col px-3 pb-6 pt-3 md:px-5 md:py-5 h-full overflow-y-auto'>
      <div className={clsx('flex-between mb-4')}>
        <h2
          className={clsx(
            'font-bold text-xl md:text-2xl truncate',
            'dark:text-white'
          )}>
          {name}
        </h2>

        <div className={clsx('flex items-center gap-1')}>
          <div
            className={clsx(
              'group flex-center rounded-full w-11 h-11',
              'transition-all duration-250 ease-out',
              'lg:hover:bg-lt-input lg:dark:hover:bg-dk-input lg:hover:scale-110',
              'cursor-pointer'
            )}>
            <ShareOutlinedIcon
              className={clsx(
                '!text-xl',
                'text-gray-500',
                'dark:group-hover:text-primary-v4-hv'
              )}
            />
          </div>
          <div
            className={clsx(
              'group flex-center rounded-full w-11 h-11',
              'transition-all duration-250 ease-out',
              'lg:hover:bg-lt-input lg:dark:hover:bg-dk-input lg:hover:scale-110',
              'cursor-pointer'
            )}>
            <MoreHorizOutlinedIcon
              className={clsx(
                '!text-xl',
                'text-gray-500',
                'dark:group-hover:text-primary-v4-hv'
              )}
            />
          </div>
        </div>
      </div>

      <div className={clsx('flex items-center mb-4')}>
        <div
          onClick={handleReactProduct}
          className={clsx(
            'group flex items-center py-0.5 mr-5 rounded-full',
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
            className={clsx('font-semibold', 'dark:text-white', 'select-none')}>
            {reactions.length}
          </span>
        </div>
        <span className={clsx('dark:text-gray-300')}>
          {total} customers review
        </span>
      </div>

      <div className={clsx('flex items-center')}>
        <ChatIcon
          className={clsx('mr-2', 'text-gray-500 dark:text-gray-200')}
        />
        <span className={clsx('mr-4 pb-0.5', 'dark:text-gray-200')}>
          {desc}
        </span>
        <Avatar
          onClick={() => visitWall(user._id)}
          rounded
          className={clsx('ml-auto mr-0.5 w-10 h-10')}
          avatar={user.avatar}
        />
      </div>

      <div
        className={clsx(
          'mt-3 pt-5 border-t border-lt-line dark:border-dk-line'
        )}>
        <div className={clsx('flex items-center mb-3')}>
          <LocalOfferOutlinedIcon className={clsx('mr-2', 'text-gray-500')} />
          <span
            className={clsx(
              'font-semibold truncate mr-6 text-sm-1',
              'cursor-pointer',
              'lg:hover:underline',
              'dark:text-gray-200'
            )}>
            @{category}
          </span>
        </div>

        <div className={clsx('flex items-center mb-3')}>
          <LocalShippingOutlinedIcon
            className={clsx('mr-2', 'text-gray-500')}
          />
          <span
            className={clsx(
              'font-semibold truncate mr-6 text-sm-1',
              'dark:text-gray-200'
            )}>
            Free shipping
          </span>
        </div>

        <div className={clsx('flex items-center mb-3')}>
          <ConstructionOutlinedIcon className={clsx('mr-2', 'text-gray-500')} />
          <span
            className={clsx(
              'font-semibold truncate mr-6 text-sm-1 w-3/4',
              'dark:text-gray-200'
            )}>
            2 hours easy returns if you change your mind
          </span>
        </div>

        <div className={clsx('flex items-center mb-3')}>
          <LocalAtmOutlinedIcon className={clsx('mr-2', 'text-gray-500')} />
          <span
            className={clsx(
              'font-bold text-base md:text-lg truncate',
              'text-primary-v1 dark:text-primary-v4'
            )}>
            {/* <span className={clsx('line-through mr-1.5 opacity-70')}>
              $1000
            </span> */}
            <span>${price}</span>
          </span>
        </div>
      </div>

      <div className={clsx('relative', 'flex items-center gap-4 mt-auto')}>
        <button
          onClick={handleBuyProduct}
          className={clsx('btn btn--primary px-5 py-2.5')}>
          <ShoppingCartOutlinedIcon className={clsx('!text-lg mr-1')} />
          <span className={clsx('text-sm-1')}>Buy now</span>
        </button>

        <div
          className={clsx('absolute right-0 bottom-0', 'flex flex-col gap-2')}>
          <div
            onClick={() => dispatch(productActions.setIsOpenCheckout(false))}
            className={clsx(
              'group flex-center rounded-full w-11 h-11',
              'transition-all duration-250 ease-out',
              'lg:hover:bg-lt-input lg:dark:hover:bg-dk-input lg:hover:scale-110',
              'cursor-pointer'
            )}>
            <DoDisturbIcon
              className={clsx(
                '!text-xl',
                'text-gray-500',
                'dark:group-hover:text-primary-v4-hv'
              )}
            />
          </div>
          <div
            className={clsx(
              'group flex-center rounded-full w-11 h-11',
              'transition-all duration-250 ease-out',
              'lg:hover:bg-lt-input lg:dark:hover:bg-dk-input lg:hover:scale-110',
              'cursor-pointer'
            )}>
            <HandymanIcon
              className={clsx(
                '!text-xl',
                'text-gray-500',
                'dark:group-hover:text-primary-v4-hv'
              )}
            />
          </div>
          <div
            onClick={() => onSelectOption(ViewOptions.REVIEWS)}
            className={clsx(
              'group flex-center rounded-full w-11 h-11',
              'transition-all duration-250 ease-out',
              'lg:hover:bg-lt-input lg:dark:hover:bg-dk-input lg:hover:scale-110',
              'cursor-pointer'
            )}>
            <ForumIcon
              className={clsx(
                '!text-xl',
                'text-gray-500',
                'dark:group-hover:text-primary-v4-hv'
              )}
            />
          </div>
          <div
            className={clsx(
              'group flex-center rounded-full w-11 h-11 shadow-primary-v2 dark:shadow-primary-v4',
              'bg-primary-v2 dark:bg-primary-v4',
              'transition-all duration-250 ease-out',
              'lg:hover:scale-110',
              'cursor-pointer'
            )}>
            <StoreIcon className={clsx('!text-xl', 'text-white')} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutDetail;
