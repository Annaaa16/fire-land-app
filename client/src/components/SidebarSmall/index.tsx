import { ReactNode } from 'react';

// clsx
import clsx from 'clsx';

import sidebarTooltips from '@/utils/sidebarTooltips';

import User from '../User';
import SmallTooltip from './SmallTooltip';

import icon from '@/assets/svgs/icon.svg';

interface SidebarSmallProps {
  isMessenger?: boolean;
}

function SidebarSmall({ isMessenger }: SidebarSmallProps) {
  return (
    <aside
      className={clsx(
        isMessenger ? 'z-50' : 'fixed left-0 top-16 z-50',
        'items-center w-20 py-6',
        isMessenger
          ? 'border-r border-lt-line dark:border-dk-line'
          : 'shadow-xl',
        isMessenger ? 'h-screen' : 'h-[calc(100vh-64px)]',
        'bg-lt-cpn dark:bg-dk-cpn'
      )}>
      {isMessenger && (
        <div
          className={clsx(
            'w-12 pb-5 mx-auto mb-6 border-b border-lt-line dark:border-dk-line',
            'cursor-pointer'
          )}>
          <img src={icon.src} alt='Logo' className={clsx('w-full')} />
        </div>
      )}
      <User view='sm' subClass='mx-auto' />

      <ul className={clsx('mt-10 w-full px-4 text-center')}>
        {sidebarTooltips.map(({ title, isActive, icon }) => (
          <SmallTooltip
            key={title}
            isActive={isActive}
            title={title}
            icon={icon}
          />
        ))}
      </ul>
    </aside>
  );
}

export default SidebarSmall;
