// clsx
import clsx from 'clsx';

import { sidebarTooltips } from '@/utils/sidebarTooltips';

import User from '../User';
import SidebarTooltip from './SidebarTooltip';

function Sidebar() {
  return (
    <div
      className={clsx(
        'flex flex-col items-center w-[300px] h-[calc(100vh-64px)] py-6 shadow-2xl',
        'bg-lt-cpn dark:bg-dk-cpn'
      )}>
      <User view='large' />

      <ul className={clsx('mt-12 w-full px-4 text-center')}>
        {sidebarTooltips.map(({ title, isActive, icon }) => (
          <SidebarTooltip
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

export default Sidebar;
