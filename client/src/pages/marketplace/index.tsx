// types
import { GetServerSideProps } from 'next';
import { GetProductsResponse } from '@/models/products';

import {
  productCategories,
  productsActions,
} from '@/redux/slices/productsSlice';
import { useProductsSelector } from '@/redux/selectors';
import { productsApiServer } from '@/apis/productsApi';
import { wrapper } from '@/redux/store';

import Meta from '@/layouts/Meta';
import Social from '@/layouts/Social';
import MarketplaceHero from '@/features/Marketplace/MarketplaceHero';
import MarketplaceMenu from '@/features/Marketplace/MarketplaceMenu';
import MarketplaceCheckout from '@/features/Marketplace/MerketplaceCheckout';
import MarketplaceProductList from '@/features/Marketplace/MarketplaceProductList';
import MarketplaceForm from '@/features/Marketplace/MarketplaceForm';

function Marketplace() {
  const { isOpenCheckout, isOpenCreateForm, categories, recent } =
    useProductsSelector();

  return (
    <Meta title='Marketplace'>
      <Social className='pb-32'>
        <MarketplaceHero />
        <MarketplaceMenu />
        <MarketplaceProductList title='Recent' more products={recent} />
        <MarketplaceProductList
          title='Hot Sales'
          more
          products={categories.free}
        />
        <MarketplaceProductList title='Free' more products={categories.food} />
        {isOpenCheckout && <MarketplaceCheckout />}
        {isOpenCreateForm && <MarketplaceForm />}
      </Social>
    </Meta>
  );
}

export default Marketplace;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    const { getProducts } = productsApiServer(ctx);

    const requests = Object.values(productCategories).map((category) => {
      return getProducts({
        page: 1,
        limit: 4,
        category,
      });
    });

    const promises = await Promise.all(requests);

    store.dispatch(productsActions.clearProducts());

    promises.forEach((promise) => {
      promise &&
        store.dispatch(
          productsActions.getProductsSuccess(
            promise?.data as GetProductsResponse
          )
        );
    });

    return {
      props: {},
    };
  });
