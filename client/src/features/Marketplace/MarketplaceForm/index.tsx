import { useState, useEffect } from 'react';

// clsx
import clsx from 'clsx';

// react hook form
import { useForm } from 'react-hook-form';

// material ui icons
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import { productsActions } from '@/redux/slices/productsSlice';
import { useProductsSelector } from '@/redux/selectors';
import useStoreDispatch from '@/hooks/useStoreDispatch';
import usePhotoPicker from '@/hooks/usePhotoPicker';

import PhotoPicker from '@/components/PhotoPicker';
import FormCategory from './FormCategory';
import FormError from './FormError';

function MarketplaceForm() {
  const { updateProduct } = useProductsSelector();

  const [selectedCategory, setSelectedCategory] = useState<string>(
    updateProduct?.category || ''
  );
  const [formField] = useState<{ [key: string]: string }>({
    name: 'name',
    price: 'price',
    desc: 'desc',
  });

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm();

  const { file, payload } = usePhotoPicker();
  const dispatch = useStoreDispatch();

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const handleCreateProduct = (data: {
    name: string;
    desc: string;
    price: number;
  }) => {
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('desc', data.desc);
    formData.append('price', data.price.toString());
    formData.append('category', selectedCategory);
    formData.append('file', file as Blob);

    dispatch(productsActions.createProductRequest(formData));
    dispatch(productsActions.setIsOpenCreateForm(false));
    dispatch(productsActions.setUpdateProduct(null));
  };

  const handleUpdateProduct = (data: {
    name: string;
    desc: string;
    price: number;
  }) => {
    if (!updateProduct) return;

    const { photo, photoId } = updateProduct;
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('desc', data.desc);
    formData.append('price', data.price.toString());
    formData.append('photo', photo);
    formData.append('photoId', photoId);
    formData.append('category', selectedCategory);
    formData.append('file', file as Blob);

    dispatch(
      productsActions.updateProductRequest({
        productId: updateProduct._id,
        updatePayload: formData,
      })
    );
    dispatch(productsActions.setIsOpenCreateForm(false));
    dispatch(productsActions.setUpdateProduct(null));
  };

  const handleCloseModal = () => {
    dispatch(productsActions.setIsOpenCreateForm(false));
    dispatch(productsActions.setUpdateProduct(null));
  };

  // Auto focus to description field
  useEffect(() => {
    setFocus(formField.desc);
  }, [setFocus, formField]);

  return (
    <div className={clsx('fixed inset-0 z-50', 'flex px-3 md:px-0')}>
      <div className='modal' onClick={handleCloseModal} />
      <div
        className={clsx(
          'relative',
          'flex flex-col md:flex-row m-auto w-[475px] h-[485px] md:h-auto rounded-xl overflow-hidden shadow-box overflow-y-auto',
          'bg-white dark:bg-dk-cpn'
        )}>
        <form
          onSubmit={handleSubmit(
            updateProduct ? handleUpdateProduct : handleCreateProduct
          )}
          className={clsx(
            'md:w-1/2 flex-grow overflow-y-auto px-2 md:px-4 py-4'
          )}>
          <div className={clsx('relative', 'mb-3')}>
            <input
              {...register(formField.name, {
                required: true,
                value: updateProduct?.name,
              })}
              autoComplete='off'
              placeholder='Product name'
              className={clsx(
                'w-full font-bold text-xl',
                'bg-transparent dark:text-white',
                'transition-all'
              )}
            />
            <FormError
              hasError={Boolean(errors[formField.name])}
              message='This field is required'
            />
          </div>
          <div className={clsx('relative', 'mb-4')}>
            <input
              {...register(formField.desc, {
                required: true,
                value: updateProduct?.desc,
              })}
              autoComplete='off'
              placeholder='Your description...'
              className={clsx(
                'w-full resize-none',
                'bg-transparent dark:text-white'
              )}
            />
            <FormError
              hasError={Boolean(errors[formField.desc])}
              message='This field is required'
            />
          </div>
          <div className={clsx('relative', 'flex items-center mb-4')}>
            <label htmlFor='price'>
              <AttachMoneyIcon
                className={clsx(
                  '!text-2xl',
                  'text-primary-v1 dark:text-primary-v4'
                )}
              />
            </label>
            <input
              {...register(formField.price, {
                required: true,
                value: updateProduct?.price,
                min: 0,
                max: 4000,
              })}
              type='number'
              autoComplete='off'
              id='price'
              placeholder='0.00'
              className={clsx(
                'w-full resize-none pl-1 font-semibold text-base',
                'bg-transparent text-primary-v1 dark:text-primary-v4'
              )}
            />
            <FormError
              hasError={Boolean(errors[formField.price])}
              message='Price must be less than 4000'
            />
          </div>

          <FormCategory
            onSelectCategory={selectCategory}
            selectedCategory={selectedCategory}
          />
          <PhotoPicker
            {...payload}
            updatePhoto={updateProduct?.photo}
            className='mb-4'
          />
          <button type='submit' className={clsx('btn py-3 px-6 w-full')}>
            {updateProduct ? 'Update' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default MarketplaceForm;
