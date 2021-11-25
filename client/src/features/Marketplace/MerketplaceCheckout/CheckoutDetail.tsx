// clsx
import clsx from 'clsx';

// material ui icons
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ForumIcon from '@mui/icons-material/Forum';
import HandymanIcon from '@mui/icons-material/Handyman';
import StoreIcon from '@mui/icons-material/Store';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

import User from '@/components/User';

function CheckoutDetail() {
  return (
    <div className='px-3 pb-6 pt-3 md:px-5 md:py-5'>
      <div className={clsx('flex-between mb-4')}>
        <h2
          className={clsx(
            'font-bold text-xl md:text-2xl truncate',
            'dark:text-white'
          )}>
          Colorful Abstract Painting
        </h2>

        <div className={clsx('flex items-center gap-1')}>
          <div
            className={clsx(
              'group flex-center rounded-full w-11 h-11',
              'transition-all duration-250 ease-out',
              'lg:hover:bg-gray-100 lg:dark:hover:bg-dk-input lg:hover:scale-110',
              'cursor-pointer'
            )}>
            <ShareOutlinedIcon
              className={clsx(
                '!text-xl',
                'text-gray-500',
                'dark:group-hover:text-primary-v4-hv'
              )}
            />
          </div>
          <div
            className={clsx(
              'group flex-center rounded-full w-11 h-11',
              'transition-all duration-250 ease-out',
              'lg:hover:bg-gray-100 lg:dark:hover:bg-dk-input lg:hover:scale-110',
              'cursor-pointer'
            )}>
            <MoreHorizOutlinedIcon
              className={clsx(
                '!text-xl',
                'text-gray-500',
                'dark:group-hover:text-primary-v4-hv'
              )}
            />
          </div>
        </div>
      </div>

      <div className={clsx('flex items-center mb-4')}>
        <div
          className={clsx(
            'group flex items-center py-0.5 mr-5 rounded-full',
            'cursor-pointer'
          )}>
          <FavoriteBorderIcon
            className={clsx(
              'mr-1',
              'text-red-400',
              '!transition-all',
              'lg:group-hover:scale-110'
            )}
          />
          <span className={clsx('font-semibold', 'dark:text-white')}>1.1k</span>
        </div>
        <span className={clsx('dark:text-gray-300')}>15 customers review</span>
      </div>

      <div className={clsx('flex')}>
        <User rounded className={clsx('w-10 h-10 mr-3')} />
        <div
          className={clsx(
            'flex items-center text-sm-1 border-l-4 border-gray-400'
          )}>
          <span className={clsx('pl-2 mr-2', 'text-gray-400')}>
            "Best choice for you"
          </span>
          <span className={clsx('font-semibold')}>
            -{' '}
            <span
              className={clsx(
                'dark:text-gray-200',
                'cursor-pointer',
                'lg:hover:underline'
              )}>
              @igdev
            </span>
          </span>
        </div>
      </div>

      <div
        className={clsx(
          'mt-6 pt-5 border-t border-lt-line dark:border-dk-line'
        )}>
        <div className={clsx('flex items-center mb-3')}>
          <LocalOfferOutlinedIcon className={clsx('mr-2', 'text-gray-500')} />
          <span
            className={clsx(
              'font-semibold truncate mr-6 text-sm-1',
              'cursor-pointer',
              'lg:hover:underline',
              'dark:text-gray-200'
            )}>
            @toys
          </span>
        </div>

        <div className={clsx('flex items-center mb-3')}>
          <LocalShippingOutlinedIcon
            className={clsx('mr-2', 'text-gray-500')}
          />
          <span
            className={clsx(
              'font-semibold truncate mr-6 text-sm-1',
              'dark:text-gray-200'
            )}>
            Free shipping
          </span>
        </div>

        <div className={clsx('flex items-center mb-3')}>
          <ConstructionOutlinedIcon className={clsx('mr-2', 'text-gray-500')} />
          <span
            className={clsx(
              'font-semibold truncate mr-6 text-sm-1 w-3/4',
              'dark:text-gray-200'
            )}>
            2 hours easy returns if you change your mind
          </span>
        </div>

        <div className={clsx('flex items-center mb-3')}>
          <LocalAtmOutlinedIcon className={clsx('mr-2', 'text-gray-500')} />
          <span
            className={clsx(
              'font-bold text-base md:text-lg truncate',
              'text-primary-v1 dark:text-primary-v4'
            )}>
            <span className={clsx('line-through mr-1.5 opacity-70')}>
              $1000
            </span>
            <span>- $20000</span>
          </span>
        </div>
      </div>

      <div className={clsx('relative', 'flex items-center gap-4 mt-8')}>
        <button className={clsx('btn px-5 py-2.5')}>
          <ShoppingCartOutlinedIcon className={clsx('!text-lg mr-1')} />
          <span className={clsx('text-sm-1')}>Buy now</span>
        </button>

        <div
          className={clsx('absolute right-0 bottom-0', 'flex flex-col gap-2')}>
          <div
            className={clsx(
              'group flex-center rounded-full w-11 h-11',
              'transition-all duration-250 ease-out',
              'lg:hover:bg-gray-100 lg:dark:hover:bg-dk-input lg:hover:scale-110',
              'cursor-pointer'
            )}>
            <DoDisturbIcon
              className={clsx(
                '!text-xl',
                'text-gray-500',
                'dark:group-hover:text-primary-v4-hv'
              )}
            />
          </div>
          <div
            className={clsx(
              'group flex-center rounded-full w-11 h-11',
              'transition-all duration-250 ease-out',
              'lg:hover:bg-gray-100 lg:dark:hover:bg-dk-input lg:hover:scale-110',
              'cursor-pointer'
            )}>
            <HandymanIcon
              className={clsx(
                '!text-xl',
                'text-gray-500',
                'dark:group-hover:text-primary-v4-hv'
              )}
            />
          </div>
          <div
            className={clsx(
              'group flex-center rounded-full w-11 h-11',
              'transition-all duration-250 ease-out',
              'lg:hover:bg-gray-100 lg:dark:hover:bg-dk-input lg:hover:scale-110',
              'cursor-pointer'
            )}>
            <ForumIcon
              className={clsx(
                '!text-xl',
                'text-gray-500',
                'dark:group-hover:text-primary-v4-hv'
              )}
            />
          </div>
          <div
            className={clsx(
              'group flex-center rounded-full w-11 h-11 shadow-primary-v2 dark:shadow-primary-v4',
              'bg-primary-v2 dark:bg-primary-v4',
              'transition-all duration-250 ease-out',
              'lg:hover:scale-110',
              'cursor-pointer'
            )}>
            <StoreIcon className={clsx('!text-xl', 'text-white')} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutDetail;
