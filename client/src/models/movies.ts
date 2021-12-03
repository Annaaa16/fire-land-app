// types
import { Loadings, Movie, TvShow } from './common';
import { TmdbParams } from './tmdb';

export interface MovieCategoryKeys {
  popular: 'popular';
  topRated: 'topRated';
  upcoming: 'upcoming';
  nowPlaying: 'nowPlaying';
  similar: 'similar';
}

export interface TvShowCategoryKeys {
  popular: 'popular';
  topRated: 'topRated';
  onTheAir: 'onTheAir';
  airingToday: 'airingToday';
  similar: 'similar';
}

export interface DefaultMovies {
  page: number;
  movies: Movie[];
  totalMovies: number;
  totalPages: number;
}

export interface DefaultTvShows {
  page: number;
  tvShows: TvShow[];
  totalTvShows: number;
  totalPages: number;
}

export interface Cast {
  readonly id: string;
  name: string;
  image: string;
}

export interface MovieVideo {
  readonly id: string;
  name: string;
  path: string;
}

interface MovieGenre {
  readonly id: string;
  name: string;
}

export interface MoviesInitState extends Loadings {
  movieCategories: {
    [key in keyof MovieCategoryKeys]: DefaultMovies;
  };
  tvShowCategories: {
    [key in keyof TvShowCategoryKeys]: DefaultTvShows;
  };
  searchedMovies: DefaultMovies;
}

export interface GetMoviesPayload {
  query: string;
  params: TmdbParams;
  moviesType: keyof MovieCategoryKeys;
}

export interface GetTvShowsPayload {
  query: string;
  params: TmdbParams;
  tvShowsType: keyof TvShowCategoryKeys;
}
