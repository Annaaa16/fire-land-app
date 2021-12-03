// clsx
import clsx from 'clsx';

// types
import { Product } from '@/models/common';

import MarketplaceFilters from '../MarketplaceFilters';
import MarketplaceProduct from '../MarketplaceProduct';

interface MarketplaceProductListProps {
  title: string;
  more?: boolean;
  filters?: boolean;
  spacing?: boolean;
  products: Product[];
}

function MarketplaceProductList(props: MarketplaceProductListProps) {
  const { title, more, filters, spacing = true, products } = props;

  if (products.length === 0) return null;

  return (
    <section className={clsx(spacing && 'mt-14')}>
      <div
        className={clsx(
          'flex flex-wrap justify-center items-center md:justify-between rounded-lg px-6 py-5 shadow-md mb-4 gap-4',
          'bg-white dark:bg-dk-cpn'
        )}>
        <h2
          className={clsx(
            'font-bold text-lg md:text-xl capitalize',
            'dark:text-white'
          )}>
          {title}
        </h2>
        {more && products.length > 4 && (
          <span
            className={clsx(
              'font-semibold underline',
              'dark:text-white',
              'cursor-pointer'
            )}>
            See more
          </span>
        )}
        {filters && <MarketplaceFilters />}
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-5'>
        {products.slice(0, 4).map((product) => (
          <MarketplaceProduct key={product._id} {...product} />
        ))}
      </div>
    </section>
  );
}

export default MarketplaceProductList;
