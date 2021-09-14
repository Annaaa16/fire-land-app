// clsx
import clsx from 'clsx';

function HeaderExp() {
  return (
    <div className={clsx('hidden lg:flex flex-col justify-center w-24 mx-3')}>
      <div
        className={clsx(
          'flex items-center justify-between mb-1',
          'text-white'
        )}>
        <span className={clsx('text-xs font-bold')}>NEXT:</span>
        <span className={clsx('text-xs font-bold')}>38 EXP</span>
      </div>
      <div
        className={clsx('relative', 'h-1 rounded-3xl', 'bg-primary-v1-input')}>
        <div
          className={clsx(
            'absolute left-0 top-0',
            'h-full w-full rounded-3xl',
            'bg-primary-v2 bg-gradient-to-r dark:from-primary-v4 dark:to-primary-v4-linear'
          )}
          style={{ width: '60%' }}
        />
      </div>
    </div>
  );
}

export default HeaderExp;
