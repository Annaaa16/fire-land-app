// clsx
import clsx from 'clsx';

// types
import { ReactNode } from 'react';

import Header from '@/components/Header';
import SidebarSmall from '@/components/SidebarSmall';

interface CenterContentProps {
  children: ReactNode;
}

function CenterContent({ children }: CenterContentProps) {
  return (
    <>
      <Header />
      <SidebarSmall />
      <div
        className={clsx(
          'lg:max-w-[1184px] px-4 lg:px-0 mx-auto py-10 mt-12',
          'bg-lt-body dark:bg-dk-body'
        )}>
        {children}
      </div>
    </>
  );
}

export default CenterContent;
