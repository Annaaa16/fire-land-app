// clsx
import clsx from 'clsx';

// material ui icons
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

import User from '@/components/User';
import Image from '@/components/Image';

import intro from '@/assets/images/intro.jpg';

function MarketplaceProduct() {
  return (
    <div
      className={clsx(
        'px-3 pt-5 rounded-xl shadow-md',
        'bg-white dark:bg-dk-cpn'
      )}>
      <div className={clsx('flex items-center justify-between mb-3')}>
        <div className={clsx('flex items-center', 'cursor-pointer')}>
          <User className={clsx('w-6 h-6 mr-1.5')} rounded />
          <span
            className={clsx(
              'text-xs font-semibold',
              'dark:text-white',
              'lg:hover:underline'
            )}>
            @igdev
          </span>
        </div>
        <div className={clsx('flex items-center', 'cursor-pointer')}>
          <User className={clsx('w-6 h-6 mr-1.5')} rounded />
        </div>
      </div>

      <div className={clsx('relative', 'rounded-xl h-64 overflow-hidden')}>
        <Image
          src={intro.src}
          alt='Product'
          layout='fill'
          className={clsx(
            'cursor-pointer',
            'transition-all duration-250 ease-in-out',
            'lg:hover:scale-[1.05]'
          )}
          objectFit='cover'
        />

        <div
          className={clsx(
            'absolute top-2 right-2',
            'group flex items-center py-0.5 px-2.5 rounded-full',
            'bg-white dark:bg-dk-cpn',
            'cursor-pointer'
          )}>
          <FavoriteBorderIcon
            className={clsx(
              'mr-1',
              'text-red-400',
              '!transition-all',
              'lg:group-hover:scale-110'
            )}
            fontSize='small'
          />
          <span className={clsx('font-semibold text-xs', 'dark:text-white')}>
            1.1k
          </span>
        </div>
      </div>
      <div className={clsx('flex items-center justify-between mt-5')}>
        <abbr
          title='Colorful Abstract Painting'
          className={clsx(
            'truncate font-semibold text-base leading-tight mr-2 w-4/5 !no-underline',
            'dark:text-white',
            'cursor-pointer',
            'hover:!underline'
          )}>
          Colorful Abstract Painting
        </abbr>

        <MoreVertOutlinedIcon
          className={clsx(
            '!text-2xl',
            'text-gray dark:text-gray-400',
            'hover:!text-gray-400 dark:hover:!text-gray-300',
            'cursor-pointer'
          )}
        />
      </div>
      <div
        className={clsx(
          'flex items-center justify-between py-3 mt-3 border-t border-lt-line dark:border-dk-line'
        )}>
        <span
          className={clsx(
            'font-semibold truncate mr-6 text-sm-1',
            'text-gray-400',
            'cursor-pointer',
            'lg:hover:underline'
          )}>
          @toys
        </span>
        <span
          className={clsx(
            'font-bold text-lg truncate',
            'text-primary-v1 dark:text-primary-v4'
          )}>
          $1000
        </span>
      </div>
    </div>
  );
}

export default MarketplaceProduct;
