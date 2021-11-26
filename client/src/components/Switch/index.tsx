// clsx
import clsx from 'clsx';

// types
import { ReactNode } from 'react';

interface SwitchProps {
  id: string;
  children: ReactNode;
  className?: string;
}

function Switch({ id, children, className }: SwitchProps) {
  return (
    <label
      htmlFor={id}
      className={clsx(
        'flex items-center',
        'cursor-pointer select-none',
        className
      )}>
      <div className={clsx('relative', 'flex-grow w-11 h-6 mr-2')}>
        <input id={id} type='checkbox' className='peer hidden' />
        <div
          className={clsx(
            'absolute inset-0',
            'rounded-full',
            'bg-gray-400',
            'transition-all ease-out',
            'peer-checked:bg-primary-v1 dark:peer-checked:bg-primary-v4'
          )}
        />
        <div
          className={clsx(
            'absolute left-[4px] top-1/2 z-1',
            'h-[17px] w-[17px] rounded-full -translate-y-1/2',
            'bg-white',
            'transition-all ease-in-out',
            'peer-checked:translate-x-[19px]'
          )}
        />
      </div>
      {children}
    </label>
  );
}

export default Switch;
