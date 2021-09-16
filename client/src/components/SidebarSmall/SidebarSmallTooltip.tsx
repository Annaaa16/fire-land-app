// clsx
import clsx from 'clsx';

interface IProps {
  title: string;
  icon: any;
  isActive: boolean;
}

import Tooltip from '../Tooltip';

function SidebarSmallTooltip(props: IProps) {
  const { title, isActive, icon: Icon } = props;

  const isDark = false;

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
          'hover:shadow-lg dark:hover:shadow-3xl hover:bg-lt-tooltip-hv dark:hover:bg-dk-tooltip-hv'
      )}>
      <Icon
        className={clsx(
          '!text-2xl',
          isActive ? 'text-white' : 'text-lt-gray dark:text-dk-gray',
          '!transition-all !duration-250',
          !isActive &&
            'group-hover:text-primary-v2 dark:group-hover:text-primary-v4'
        )}
      />
      <Tooltip title={title} />
    </li>
  );
}

export default SidebarSmallTooltip;
