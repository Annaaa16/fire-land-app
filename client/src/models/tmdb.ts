// types
import { Movie } from './common';

interface MovieList {
  page: number;
  movies: Movie[];
  totalMovies: number;
  totalPages: number;
}

export interface TmdbCast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
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

export interface TmdbInitState {
  movieList: {
    [key: string]: MovieList;
  };
  movieDetail: {
    readonly id: string;
    title: string;
    overview: string;
    image: string;
    casts: Cast[];
    videos: MovieVideo[];
    genres: MovieGenre[];
  };
}

export interface MovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Array<{
    id: number;
    name: string;
  }>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: 0.5;
  poster_path: null;
  production_companies: Array<{
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }>;
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<{
    iso_639_1: string;
    name: string;
  }>;
  status: string;
  tagline: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
}

interface TmdbVideo {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface Params {
  page: number;
}

// === Responses ===
export interface GetMovieListResponse {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}

export type GetMovieDetailResponse = MovieDetail;

export interface GetCastListResponse {
  readonly id: string;
  cast: TmdbCast[];
}

export interface GetVideosResponse {
  readonly id: string;
  results: TmdbVideo[];
}
