// clsx
import clsx from 'clsx';

// types
import { ReactNode } from 'react';

interface SwitchProps {
  children: ReactNode;
  className?: string;
  checked?: boolean;
  onClick?: () => void;
}

function Switch(props: SwitchProps) {
  const { children, checked, className, onClick } = props;

  return (
    <div
      onClick={onClick}
      className={clsx(
        'flex items-center',
        'cursor-pointer select-none',
        className
      )}>
      <div className={clsx('relative', 'flex-grow w-11 h-6 mr-2')}>
        <div
          className={clsx(
            'absolute inset-0',
            'rounded-full',
            checked ? 'bg-primary-v1 dark:bg-primary-v4' : 'bg-gray-400',
            'transition-all ease-out'
          )}
        />
        <div
          className={clsx(
            'absolute left-[4px] top-1/2 z-1',
            'h-[17px] w-[17px] rounded-full -translate-y-1/2',
            checked ? 'translate-x-[19px]' : 'translate-x-0',
            'bg-white',
            'transition-all ease-in-out'
          )}
        />
      </div>
      {children}
    </div>
  );
}

export default Switch;
