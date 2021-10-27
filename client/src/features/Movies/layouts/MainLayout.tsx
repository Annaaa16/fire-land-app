// types
import { ReactNode } from 'react';

import MoviesFooter from '../components/MoviesFooter';
import MoviesHeader from '../components/MoviesHeader';

interface MoviesProps {
  children: ReactNode;
}

function MainLayout({ children }: MoviesProps) {
  return (
    <>
      <MoviesHeader />
      {children}
      <MoviesFooter />
    </>
  );
}

export default MainLayout;
