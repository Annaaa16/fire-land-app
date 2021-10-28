import { COLORS } from '@/constants';

import { useTmdbSelector } from '@/redux/selectors';

import Meta from '@/layouts/Meta';
import MainLayout from '../layouts/MainLayout';
import MoviesItemList from '../components/MoviesItemList';
import MoviesHeroSlider from '../components/MoviesHeroSlider';

function Movies() {
  const {
    movieList: { upcoming, topRated },
  } = useTmdbSelector();

  return (
    <Meta title='Movies' backgroundColor={COLORS.DARK_BODY}>
      <MainLayout>
        <MoviesHeroSlider />
        <MoviesItemList title='Upcoming Movies' movies={upcoming.movies} />
        <MoviesItemList title='Top Rated' movies={topRated.movies} />
      </MainLayout>
    </Meta>
  );
}

export default Movies;
