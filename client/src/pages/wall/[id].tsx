// clsx
import clsx from 'clsx';

import Meta from '@/layouts/Meta';
import Header from '@/components/Header';
import WallCover from '@/features/Wall/components/WallCover';
import CenterContent from '@/layouts/CenterContent';

function Wall() {
  return (
    <>
      <Header />
      <Meta title='Wall'>
        <CenterContent>
          <WallCover />
        </CenterContent>
      </Meta>
    </>
  );
}

export default Wall;
