import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

// types
import {
  ProductCategories,
  GetProductsResponse,
  GetProductsParams as Params,
} from '@/models/products';
import { AxiosResponse } from 'axios';
import { GetServerSideProps } from 'next';

import { LIMITS, STATUS_CODES } from '@/constants';
import { productsApiServer } from '@/apis/productsApi';
import { wrapper } from '@/redux/store';
import { useProductsSelector } from '@/redux/selectors';
import { productsActions, actions } from '@/redux/slices/productsSlice';
import { redirectToNotFound } from '@/helpers/server';
import { notifyPageError } from '@/helpers/notifyError';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useStoreDispatch from '@/hooks/useStoreDispatch';
import string from '@/helpers/string';

import Meta from '@/layouts/Meta';
import Social from '@/layouts/Social';
import MarketplaceProductList from '@/features/Marketplace/MarketplaceProductList';
import MarketplaceCheckout from '@/features/Marketplace/MerketplaceCheckout';

function Detail() {
  const { nextPage, loadings, isOpenCheckout } = useProductsSelector();

  const router = useRouter();
  const loaderRef = useRef<HTMLDivElement>(null);

  const dispatch = useStoreDispatch();
  const isIntersecting = useIntersectionObserver(loaderRef, '500px');

  const isLoading = loadings.includes(actions.getProducts);
  const category = router.query.category as keyof ProductCategories;

  useEffect(() => {
    const { order, sort } = router.query;

    if (isIntersecting && nextPage && !isLoading) {
      dispatch(
        productsActions.getProductsRequest({
          page: nextPage,
          limit: LIMITS.PRODUCTS,
          category,
          order: order as keyof Params['order'],
          sort: sort as keyof Params['order'],
        })
      );
    }
  }, [isIntersecting, nextPage, isLoading, category, dispatch, router.query]);

  return (
    <Meta title={'Products - ' + string.capitalize(category)}>
      <Social>
        <MarketplaceProductList
          title={string.capitalize(category)}
          category={category}
          filters
          more={false}
          spacing={false}
          showcase={false}
        />
        <div ref={loaderRef} />
        {isOpenCheckout && <MarketplaceCheckout />}
      </Social>
    </Meta>
  );
}

export default Detail;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    const { getProducts } = productsApiServer(ctx);
    const { category, order, sort } = ctx.query;

    if (!category) {
      return redirectToNotFound();
    }

    let statusCode = STATUS_CODES.DEFAULT;

    store.dispatch(productsActions.clearProducts());

    try {
      const response = (await getProducts({
        page: 1,
        limit: LIMITS.PRODUCTS,
        category: category as keyof ProductCategories,
        order: order as Params['order'],
        sort: sort as Params['sort'],
      })) as AxiosResponse<GetProductsResponse>;

      response &&
        store.dispatch(productsActions.getProductsSuccess(response.data));

      statusCode = response.status;
    } catch (error) {
      statusCode = STATUS_CODES.SERVER_ERROR;
      notifyPageError('Marketplace products', error);
    }

    if (statusCode >= STATUS_CODES.BAD_REQUEST) {
      return redirectToNotFound();
    }

    return {
      props: {},
    };
  });
