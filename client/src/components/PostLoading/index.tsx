// clsx
import clsx from 'clsx';

function PostLoading() {
  return (
    <div
      className={clsx(
        'w-full h-80 mt-7 rounded-lg p-4 shadow-md',
        'bg-lt-cpn dark:bg-dk-cpn',
        'animate-pulse'
      )}>
      <div className={clsx('flex items-center mb-5')}>
        <div
          className={clsx(
            'w-11 h-11 rounded-full mr-3',
            'bg-gray-600 dark:bg-gray-700'
          )}
        />
        <div className={clsx('flex-grow space-y-3')}>
          <div
            className={clsx(
              'h-4 w-1/4 rounded',
              'bg-gray-600 dark:bg-gray-700'
            )}
          />
          <div className={clsx('flex items-center space-x-2')}>
            <div
              className={clsx(
                'h-4 w-7 rounded',
                'bg-gray-600 dark:bg-gray-700'
              )}
            />
            <div
              className={clsx(
                'h-4 w-7 rounded',
                'bg-gray-600 dark:bg-gray-700'
              )}
            />
          </div>
        </div>
      </div>

      <div className={clsx('space-y-5')}>
        <div
          className={clsx('h-4 w-1/6 rounded', 'bg-gray-600 dark:bg-gray-700')}
        />
        <div className={clsx('h-4', 'bg-transparent')} />
        <div className={clsx('flex items-center space-x-3')}>
          <div
            className={clsx(
              'h-4 w-1/5 rounded',
              'bg-gray-600 dark:bg-gray-700'
            )}
          />
          <div
            className={clsx(
              'h-4 w-1/6 rounded',
              'bg-gray-600 dark:bg-gray-700'
            )}
          />
          <div
            className={clsx(
              'h-4 w-1/5 rounded',
              'bg-gray-600 dark:bg-gray-700'
            )}
          />
        </div>

        <div className={clsx('flex items-center space-x-3')}>
          <div
            className={clsx(
              'h-4 w-2/12 rounded',
              'bg-gray-600 dark:bg-gray-700'
            )}
          />
          <div
            className={clsx(
              'h-4 w-1/12 rounded',
              'bg-gray-600 dark:bg-gray-700'
            )}
          />
          <div
            className={clsx(
              'h-4 w-5/12 rounded',
              'bg-gray-600 dark:bg-gray-700'
            )}
          />
          <div
            className={clsx(
              'h-4 w-1/12 rounded',
              'bg-gray-600 dark:bg-gray-700'
            )}
          />
        </div>
        <div className={clsx('flex items-center space-x-3')}>
          <div className={clsx('h-4', 'bg-transparent')} />
          <div className={clsx('h-4', 'bg-transparent')} />
        </div>
        <div className={clsx('flex items-center space-x-3')}>
          <div
            className={clsx(
              'h-4 w-1/12 rounded',
              'bg-gray-600 dark:bg-gray-700'
            )}
          />
          <div
            className={clsx(
              'h-4 w-1/12 rounded',
              'bg-gray-600 dark:bg-gray-700'
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default PostLoading;
