import { useRouter } from 'next/router';

// clsx
import clsx from 'clsx';

// types
import { ProductCategories } from '@/models/products';

import { PATHS } from '@/constants';
import { useProductsSelector } from '@/redux/selectors';

import MarketplaceFilters from '../MarketplaceFilters';
import MarketplaceProduct from '../MarketplaceProduct';

interface MarketplaceProductListProps {
  title: string;
  more?: boolean;
  filters?: boolean;
  spacing?: boolean;
  showcase?: boolean;
  category: keyof ProductCategories;
}

function MarketplaceProductList(props: MarketplaceProductListProps) {
  const { categories } = useProductsSelector();

  const {
    title,
    more = true,
    filters,
    spacing = true,
    category,
    showcase = true,
  } = props;

  const router = useRouter();

  const products = categories[category];
  const displayedProducts = showcase ? products.slice(0, 4) : products;

  if (displayedProducts?.length === 0) return null;

  const handleSeeMore = () => {
    router.push({
      pathname: PATHS.MARKETPLACE_PRODUCTS,
      query: { category },
    });
  };

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
            onClick={handleSeeMore}
            className={clsx(
              'font-semibold underline',
              'dark:text-white',
              'cursor-pointer'
            )}>
            See more
          </span>
        )}
        {filters && <MarketplaceFilters category={category} />}
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-5'>
        {displayedProducts.map((product) => (
          <MarketplaceProduct key={product._id} {...product} />
        ))}
      </div>
    </section>
  );
}

export default MarketplaceProductList;
