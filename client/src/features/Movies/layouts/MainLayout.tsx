// types
import { ReactNode } from 'react';

import { COLORS } from '@/constants';

import Meta from '@/layouts/Meta';
import MoviesFooter from '../components/MoviesFooter';
import MoviesHeader from '../components/MoviesHeader';

interface MoviesProps {
  title: string;
  children: ReactNode;
}

function MainLayout({ title, children }: MoviesProps) {
  return (
    <Meta title={title} backgroundColor={COLORS.DARK_BODY}>
      <MoviesHeader />
      {children}
      <MoviesFooter />
    </Meta>
  );
}

export default MainLayout;