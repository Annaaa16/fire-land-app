// clsx
import clsx from 'clsx';

// material ui icons
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

// types
import { Product, User } from '@/models/common';

import { productActions } from '@/redux/slices/productsSlice';
import { useUsersSelector } from '@/redux/selectors';
import useStoreDispatch from '@/hooks/useStoreDispatch';

interface ProductOptionsProps {
  product: Product;
  user: User;
}

function ProductOptions({ product, user }: ProductOptionsProps) {
  const { currentUser } = useUsersSelector();

  const dispatch = useStoreDispatch();

  const isOwnProduct = currentUser._id === user._id;

  const handleSelectEditProduct = () => {
    dispatch(productActions.setIsOpenCreateForm(true));
    dispatch(productActions.setUpdateProduct(product));
  };

  return (
    <ul
      className={clsx(
        'absolute right-0 top-full z-[10]',
        'p-2 mt-1 min-w-max rounded-lg shadow-box scale-0 opacity-0 invisible',
        'bg-white dark:bg-dk-cpn',
        'origin-top-right transition-all duration-[350ms] ease-out',
        'pointer-events-none',
        'group-hover:scale-100 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto'
      )}>
      {isOwnProduct && (
        <li
          onClick={handleSelectEditProduct}
          className={clsx(
            'pl-2 pr-4 py-3 rounded-lg',
            'dark:bg-dk-cpn',
            'transition-all ease-out',
            'lg:hover:bg-lt-input lg:dark:hover:bg-dk-tooltip'
          )}>
          <EditOutlinedIcon className={clsx('dark:text-white')} />
          <span
            className={clsx(
              'ml-1.5 font-semibold text-xs md:text-sm',
              'dark:text-white'
            )}>
            Edit product
          </span>
        </li>
      )}
      <li
        className={clsx(
          'pl-2 pr-4 py-3 rounded-lg',
          'dark:bg-dk-cpn',
          'transition-all ease-out',
          'lg:hover:bg-lt-input lg:dark:hover:bg-dk-tooltip'
        )}>
        <GroupAddIcon className={clsx('dark:text-white')} />
        <span
          className={clsx(
            'ml-1.5 font-semibold text-xs md:text-sm',
            'dark:text-white'
          )}>
          Invite members
        </span>
      </li>

      <div
        className={clsx('h-px w-full my-1.5', 'bg-lt-line dark:bg-dk-line')}
      />

      <li
        className={clsx(
          'pl-2 pr-4 py-3 rounded-lg',
          'dark:bg-dk-cpn',
          'transition-all ease-out',
          'lg:hover:bg-lt-input lg:dark:hover:bg-dk-tooltip'
        )}>
        <ArchiveOutlinedIcon className={clsx('dark:text-white')} />
        <span
          className={clsx(
            'ml-1.5 font-semibold text-xs md:text-sm',
            'dark:text-white'
          )}>
          Move to archive
        </span>
      </li>
      {isOwnProduct && (
        <li
          onClick={() =>
            dispatch(
              productActions.deleteProductRequest({ productId: product._id })
            )
          }
          className={clsx(
            'pl-2 pr-4 py-3 rounded-lg',
            'dark:bg-dk-cpn',
            'transition-all ease-out',
            'lg:hover:bg-lt-input lg:dark:hover:bg-dk-tooltip'
          )}>
          <DeleteOutlineOutlinedIcon className={clsx('dark:text-white')} />
          <span
            className={clsx(
              'ml-1.5 font-semibold text-xs md:text-sm',
              'dark:text-white'
            )}>
            Move to trash
          </span>
        </li>
      )}

      <li className={clsx('absolute right-0 -top-4 z-50', 'w-1/2 h-8')} />
    </ul>
  );
}

export default ProductOptions;
