import { API_URLS, TMDB } from '../constants';

// types
import {
  TmdbCategories,
  TmdbMoviesEndpoints,
  TmdbTvShowsEndpoints,
} from '@/models/tmdb';

export const tmdbCategories: TmdbCategories = {
  movie: 'movie',
  tv: 'tv',
};

export const tmdbMoviesEndpoints: TmdbMoviesEndpoints = {
  popular: 'popular',
  topRated: 'top_rated',
  upcoming: 'upcoming',
  nowPlaying: 'now_playing',
  similar: 'similar',
};

export const tmdbTvShowsEndpoints: TmdbTvShowsEndpoints = {
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
  getW500Image: (imgPath: string) => `${TMDB.IMAGE}/w500/${imgPath}`,
};

export default tmdb;
