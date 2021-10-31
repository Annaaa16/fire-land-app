// types
import { Movie, TvShow } from './common';
import { TmdbParams } from './tmdb';

import {
  movieCategoryKeys,
  tvShowCategoryKeys,
} from '../redux/slices/moviesSlice';

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

export interface DefaultMovie {
  page: number;
  movies: Movie[];
  totalMovies: number;
  totalPages: number;
}

export interface DefaultTvShow {
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

export interface MoviesInitState {
  movieCategories: {
    [key in keyof typeof movieCategoryKeys]: DefaultMovie;
  };
  tvShowCategories: {
    [key in keyof typeof tvShowCategoryKeys]: DefaultTvShow;
  };
  detailInfo: {
    readonly id: string;
    title: string;
    overview: string;
    image: string;
    casts: Cast[];
    videos: MovieVideo[];
    genres: MovieGenre[];
  };
}

export interface GetMovies {
  query: string;
  params: TmdbParams;
  moviesType: keyof typeof movieCategoryKeys;
}

export interface GetTvShows {
  query: string;
  params: TmdbParams;
  tvShowsType: keyof typeof tvShowCategoryKeys;
}
