// types
import { GetServerSideProps } from 'next';
import { GetProductsResponse } from '@/models/products';

import {
  productCategories,
  productActions,
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
  const { isOpenCheckout, isOpenCreateForm } = useProductsSelector();

  return (
    <Meta title='Marketplace'>
      <Social className='pb-32'>
        <MarketplaceHero />
        <MarketplaceMenu />
        <MarketplaceProductList title='Food' category='food' />
        <MarketplaceProductList title='Drinks' category='drinks' />
        <MarketplaceProductList
          title='Entertainments'
          category='entertainments'
        />
        <MarketplaceProductList title='Games' category='games' />
        <MarketplaceProductList title='Sports' category='sports' />
        <MarketplaceProductList title='Vehicles' category='vehicles' />
        <MarketplaceProductList title='Comics' category='comics' />
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

    try {
      const requests = Object.values(productCategories).map((category) => {
        return getProducts({
          page: 1,
          limit: 5,
          category,
        });
      });

      const promises = await Promise.all(requests);

      store.dispatch(productActions.clearProducts());

      promises.forEach((promise) => {
        promise &&
          store.dispatch(
            productActions.getProductsSuccess(
              promise?.data as GetProductsResponse
            )
          );
      });
    } catch (error: any) {
      console.log('Get products error at server 👉', error?.message);
    }

    return {
      props: {},
    };
  });
