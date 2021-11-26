import Meta from '@/layouts/Meta';
import Social from '@/layouts/Social';
import MarketplaceProductList from '@/features/Marketplace/MarketplaceProductList';

function Detail() {
  return (
    <Meta title='Category'>
      <Social>
        <MarketplaceProductList title='Category' filters spacing={false} />
      </Social>
    </Meta>
  );
}

export default Detail;
