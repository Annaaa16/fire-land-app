// clsx
import clsx from 'clsx';

// types
import { SvgIconProps } from '@mui/material';
import { ComponentType } from 'react';

interface SmallTooltipProps {
  title: string;
  icon: ComponentType<SvgIconProps>;
  isActive: boolean;
}

import Tooltip from '../Tooltip';

function SmallTooltip(props: SmallTooltipProps) {
  const { title, isActive, icon: Icon } = props;

  const isDark = true;

  return (
    <li
      className={clsx(
        'relative',
        'group py-3 rounded-xl mb-5',
        isActive && 'bg-primary-v2 dark:bg-primary-v4',
        isDark && isActive
          ? 'shadow-primary-v4'
          : isActive && 'shadow-primary-v2',
        'cursor-pointer',
        'transition-all duration-200',
        !isActive &&
          'hover:shadow-lg dark:hover:shadow-3xl hover:bg-white dark:hover:bg-dk-tooltip'
      )}>
      <Icon
        className={clsx(
          '!text-2xl',
          isActive ? 'text-white' : 'text-lt-gray dark:text-dk-gray',
          !isActive &&
            'group-hover:text-primary-v2 dark:group-hover:text-primary-v4'
        )}
      />
      <Tooltip title={title} direction='rtl' />
    </li>
  );
}

export default SmallTooltip;
