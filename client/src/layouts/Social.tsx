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
      <main
        className={clsx(
          'lg:max-w-social-layout px-4 lg:px-0 mx-auto py-10 mt-14 pb-50',
          'bg-lt-body dark:bg-dk-body',
          className
        )}>
        {children}
      </main>
    </>
  );
}

export default Social;
