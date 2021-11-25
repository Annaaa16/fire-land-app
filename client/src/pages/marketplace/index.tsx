// clsx
import clsx from 'clsx';

import Meta from '@/layouts/Meta';
import Social from '@/layouts/Social';
import MarketplaceHero from '@/features/Marketplace/MarketplaceHero';
import MarketplaceMenu from '@/features/Marketplace/MarketplaceMenu';
import MarketplaceCheckout from '@/features/Marketplace/MerketplaceCheckout';
import MarketplaceProductList from '@/features/Marketplace/MarketplaceProductList';

function Marketplace() {
  return (
    <Meta title='Marketplace'>
      <Social>
        <MarketplaceHero />
        <MarketplaceMenu />
        <MarketplaceProductList title='Hot Sales' more />
        <MarketplaceProductList title='Free' more />
        {/* <MarketplaceCheckout /> */}
      </Social>
    </Meta>
  );
}

export default Marketplace;
