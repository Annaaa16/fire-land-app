// clsx
import clsx from 'clsx';

import User from '@/components/User';

import intro from '@/assets/images/intro.jpg';
import CheckoutDetail from './CheckoutDetail';
import CheckoutReviews from './CheckoutReviews';

function MarketplaceCheckout() {
  return (
    <div className={clsx('fixed inset-0 z-50', 'flex px-4 md:px-0')}>
      <div
        className={clsx(
          'absolute inset-0',
          'w-full h-full',
          'bg-gray-900 opacity-80'
        )}
      />
      <div
        className={clsx(
          'relative',
          'flex flex-col md:flex-row m-auto max-w-[980px] h-[75vh] md:h-auto rounded-xl overflow-hidden shadow-box',
          'bg-white dark:bg-dk-cpn'
        )}>
        <div className={clsx('h-50 md:h-auto md:w-1/2')}>
          <img src={intro.src} alt='Thumbnail' className={clsx('img-cover')} />
        </div>

        <div
          className={clsx(
            'flex flex-col justify-between md:w-1/2 flex-grow overflow-y-auto'
          )}>
          <CheckoutDetail />
          {/* <CheckoutReviews /> */}
        </div>
      </div>
    </div>
  );
}

export default MarketplaceCheckout;
