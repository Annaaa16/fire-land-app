// clsx
import clsx from 'clsx';

import { sidebarTooltips } from '@/utils/sidebarTooltips';

import User from '../User';
import SidebarSmallTooltip from './SidebarSmallTooltip';

function SidebarSmall() {
  return (
    <div
      className={clsx(
        'flex flex-col items-center w-sidebar-sm-w h-sidebar-sm-h py-6 shadow-xl',
        'bg-lt-cpn dark:bg-dk-cpn'
      )}>
      <User view='small' />

      <ul className={clsx('mt-12 w-full px-4 text-center')}>
        {sidebarTooltips.map(({ title, isActive, icon }) => (
          <SidebarSmallTooltip
            key={title}
            isActive={isActive}
            title={title}
            icon={icon}
          />
        ))}
      </ul>
    </div>
  );
}

export default SidebarSmall;
