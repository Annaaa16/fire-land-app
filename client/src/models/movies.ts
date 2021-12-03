// types
import { Loadings, Movie, TvShow } from './common';
import { TmdbParams } from './tmdb';
import { ValueOf } from './utils';

import {
  movieCategoryKeys,
  tvShowCategoryKeys,
} from '../redux/slices/moviesSlice';

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
    [key in keyof typeof movieCategoryKeys]: DefaultMovies;
  };
  tvShowCategories: {
    [key in keyof typeof tvShowCategoryKeys]: DefaultTvShows;
  };
  searchedMovies: DefaultMovies;
}

export interface GetMoviesPayload {
  query: string;
  params: TmdbParams;
  moviesType: ValueOf<typeof movieCategoryKeys>;
}

export interface GetTvShowsPayload {
  query: string;
  params: TmdbParams;
  tvShowsType: ValueOf<typeof tvShowCategoryKeys>;
}
