// clsx
import clsx from 'clsx';

// types
import { SvgIconProps } from '@mui/material';
import { ComponentType } from 'react';

interface SidebarTooltipProps {
  title: string;
  icon: ComponentType<SvgIconProps>;
  isActive: boolean;
}

function SidebarTooltip(props: SidebarTooltipProps) {
  const { title, isActive, icon: Icon } = props;

  const isDark = true;

  return (
    <li
      className={clsx(
        'group py-3 px-4 rounded-xl mb-5',
        isDark && isActive
          ? 'shadow-primary-v4'
          : isActive && 'shadow-primary-v2',
        isActive && 'bg-primary-v2 dark:bg-primary-v4',
        'transition-all duration-200',
        'cursor-pointer',
        !isActive &&
          'hover:shadow-lg dark:hover:shadow-3xl hover:bg-white dark:hover:bg-dk-tooltip'
      )}>
      <div className={clsx('flex items-center')}>
        <Icon
          className={clsx(
            '!text-2xl',
            isActive ? 'text-white' : 'text-gray-lt dark:text-gray-dk',
            !isActive &&
              'group-hover:text-primary-v2 dark:group-hover:text-primary-v4'
          )}
        />
        <span
          className={clsx(
            'ml-3 font-semibold',
            isActive ? 'text-white' : 'dark:text-white',
            'transition-all duration-250 ease-out',
            !isActive && 'group-hover:translate-x-1'
          )}>
          {title}
        </span>
      </div>
    </li>
  );
}

export default SidebarTooltip;
