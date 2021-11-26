// clsx
import clsx from 'clsx';

// types
import { SvgIconProps } from '@mui/material';
import { ComponentType } from 'react';

interface MenuItemProps {
  title: string;
  icon: ComponentType<SvgIconProps>;
}

function MenuItem({ title, icon: Icon }: MenuItemProps) {
  return (
    <div className={clsx('group flex items-center', 'cursor-pointer')}>
      <Icon
        className={clsx(
          'mr-1.5 !text-2xl',
          'lg:group-hover:text-primary-v1-hv lg:dark:group-hover:text-primary-v4-hv'
        )}
      />
      <span
        className={clsx(
          'text-sm-1 font-semibold',
          'transition-all duration-250 ease-out',
          'lg:group-hover:text-primary-v1-hv lg:dark:group-hover:text-primary-v4-hv'
        )}>
        {title}
      </span>
    </div>
  );
}

export default MenuItem;
