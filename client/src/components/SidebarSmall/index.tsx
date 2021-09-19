// clsx
import clsx from 'clsx';

import { sidebarTooltips } from '@/utils/sidebarTooltips';

import User from '../User';
import SidebarSmallTooltip from './SidebarSmallTooltip';

function SidebarSmall() {
  return (
    <div
      className={clsx(
        'fixed top-[64px] left-0 z-50',
        'flex flex-col items-center w-[80px] h-[calc(100vh-64px)] py-6 shadow-xl',
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
