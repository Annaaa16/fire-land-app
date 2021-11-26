// clsx
import User from '@/components/User';
import clsx from 'clsx';

function WidgetsGroups() {
  return (
    <div
      className={clsx(
        'p-4 rounded-xl shadow-md dark:shadow-xl mt-5',
        'bg-white dark:bg-dk-cpn'
      )}>
      <div
        className={clsx(
          'flex items-center justify-between pb-3.5 border-b border-lt-line dark:border-dk-line'
        )}>
        <h3 className={clsx('font-semibold', 'dark:text-white')}>Groups</h3>
        <span
          className={clsx(
            'text-sm-1 font-semibold',
            'text-gray-lt',
            'transition-all',
            'cursor-pointer',
            'lg:hover:text-primary-v1-hv lg:dark:hover:text-primary-v4-hv'
          )}>
          See All
        </span>
      </div>
      <ul className={clsx('mt-5 -mb-3')}>
        <li className={clsx('flex items-center justify-between pb-7')}>
          <div className={clsx('flex items-center')}>
            <User view='sm' />
            <div className={clsx('ml-4')}>
              <div
                className={clsx(
                  'font-semibold mb-1',
                  'dark:text-white',
                  'cursor-pointer',
                  'lg:hover:underline'
                )}>
                IG Dev
              </div>
              <div
                className={clsx(
                  'text-xs',
                  'text-gray-lt',
                  'cursor-pointer',
                  'lg:hover:underline'
                )}>
                265 Members
              </div>
            </div>
          </div>
          <span
            className={clsx(
              'text-sm-1 font-semibold',
              'text-primary-v1 dark:text-primary-v4',
              'transition-all ease-out',
              'cursor-pointer',
              'lg:hover:text-primary-v1-hv lg:dark:hover:text-primary-v4-hv'
            )}>
            Join
          </span>
        </li>
      </ul>
    </div>
  );
}

export default WidgetsGroups;
