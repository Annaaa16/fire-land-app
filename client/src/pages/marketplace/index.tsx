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
import { redirectToNotFound } from '@/helpers/server';

import Meta from '@/layouts/Meta';
import Social from '@/layouts/Social';
import MarketplaceHero from '@/features/marketplace/components/MarketplaceHero';
import MarketplaceMenu from '@/features/marketplace/components/MarketplaceMenu';
import MarketplaceCheckout from '@/features/marketplace/components/MarketplaceCheckout';
import MarketplaceProductList from '@/features/marketplace/components/MarketplaceProductList';
import MarketplaceForm from '@/features/marketplace/components/MarketplaceForm';

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

      const responses = await Promise.all(requests);

      store.dispatch(productActions.clearProducts());

      responses.forEach((response) => {
        store.dispatch(
          productActions.getProductsSuccess(response as GetProductsResponse)
        );
      });
    } catch (error) {
      return redirectToNotFound();
    }

    return {
      props: {},
    };
  });
