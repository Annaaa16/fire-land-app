// types
import { ReactNode } from 'react';

import Meta from '@/layouts/Meta';
import MoviesFooter from '../components/MoviesFooter';
import MoviesHeader from '../components/MoviesHeader';
import MoviesPreview from '../components/MoviesPreview';

interface MoviesProps {
  title: string;
  children: ReactNode;
}

function MainLayout({ title, children }: MoviesProps) {
  return (
    <Meta title={title}>
      <MoviesHeader />
      <main className='bg-dk-body'>
        {children}
        <MoviesPreview />
        <MoviesFooter />
      </main>
    </Meta>
  );
}

export default MainLayout;
