// clsx
import clsx from 'clsx';

// types
import { ReactNode } from 'react';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

interface SocialProps {
  children: ReactNode;
  className?: string;
}

function Social({ children, className }: SocialProps) {
  return (
    <>
      <Header />
      <Sidebar />
      <div
        className={clsx(
          'lg:max-w-[1184px] px-4 lg:px-0 mx-auto py-10 mt-14',
          'bg-lt-body dark:bg-dk-body',
          className
        )}>
        {children}
      </div>
    </>
  );
}

export default Social;
