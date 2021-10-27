import { COLORS } from '@/constants';

import Meta from '@/layouts/Meta';
import MainLayout from '../layouts/MainLayout';
import MoviesGenreList from '../components/MoviesGenreList';
import MoviesHeroSlider from '../components/MoviesHeroSlider';

function Movies() {
  return (
    <Meta title='Movies' backgroundColor={COLORS.DARK_BODY}>
      <MainLayout>
        <MoviesHeroSlider />
        <MoviesGenreList title='Upcoming Movies' />
      </MainLayout>
    </Meta>
  );
}

export default Movies;
