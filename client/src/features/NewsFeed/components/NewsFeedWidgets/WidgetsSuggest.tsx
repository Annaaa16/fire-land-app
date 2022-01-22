// clsx
import clsx from 'clsx';

import { useGlobalContext } from '@/contexts/GlobalContext';

import Avatar from '@/components/Avatar';

function WidgetsSuggest() {
  const { notifyMaintain } = useGlobalContext();

  return (
    <div
      className={clsx(
        'p-4 rounded-xl shadow-md dark:shadow-xl',
        'bg-white dark:bg-dk-cpn'
      )}>
      <div
        className={clsx(
          'flex-between pb-3.5 border-b border-lt-line dark:border-dk-line'
        )}>
        <h3 className={clsx('font-semibold', 'dark:text-white')}>
          Suggestions For You
        </h3>
        <span
          onClick={notifyMaintain}
          className={clsx(
            'text-sm-1 font-semibold',
            'text-gray-lt',
            'transition-all',
            'cursor-pointer select-none',
            'lg:hover:text-primary-v1-hv lg:dark:hover:text-primary-v4-hv'
          )}>
          See All
        </span>
      </div>
      <ul className={clsx('mt-5 -mb-3')}>
        <li className={clsx('flex-between pb-7')}>
          <div className={clsx('flex items-center')}>
            <Avatar view='sm' rounded />
            <div className={clsx('ml-4')}>
              <div
                className={clsx(
                  'font-semibold mb-1',
                  'dark:text-white',
                  'cursor-pointer',
                  'lg:hover:underline'
                )}>
                Leonardo da Vinci
              </div>
              <div
                className={clsx(
                  'text-xs',
                  'text-gray-lt',
                  'cursor-pointer',
                  'lg:hover:underline'
                )}>
                @leonardo
              </div>
            </div>
          </div>
          <span
            onClick={notifyMaintain}
            className={clsx(
              'text-sm-1 font-semibold',
              'text-primary-v1 dark:text-primary-v4',
              'transition-all ease-out',
              'cursor-pointer select-none',
              'lg:hover:text-primary-v1-hv lg:dark:hover:text-primary-v4-hv'
            )}>
            Follow
          </span>
        </li>
      </ul>
    </div>
  );
}

export default WidgetsSuggest;
