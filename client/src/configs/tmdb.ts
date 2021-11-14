import { API_URLS, TMDB } from '../constants';

// types
import { TmdbCategories } from '@/models/tmdb';

const tmdbCategories: TmdbCategories = {
  movie: 'movie',
  tv: 'tv',
};

const tmdbMoviesEndpoints = {
  popular: 'popular',
  topRated: 'top_rated',
  upcoming: 'upcoming',
  nowPlaying: 'now_playing',
  similar: 'similar',
};

const tmdbTvShowsEndpoints = {
  popular: 'popular',
  topRated: 'top_rated',
  onTheAir: 'on_the_air',
  airingToday: 'airing_today',
  similar: 'similar',
};

const tmdb = {
  baseUrl: API_URLS.TMDB,
  apiKey: TMDB.API_KEY,
  getOriginalImage: (imgPath: string) => `${TMDB.IMAGE}/original/${imgPath}`,
  getW780Image: (imgPath: string) => `${TMDB.IMAGE}/w780/${imgPath}`,
};

export { tmdbCategories, tmdbMoviesEndpoints, tmdbTvShowsEndpoints };

export default tmdb;
