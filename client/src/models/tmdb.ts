export interface TmdbCategories {
  movie: 'movie';
  tv: 'tv';
}

export interface TmdbParams {
  page: number;
}

interface TmdbGenre {
  readonly id: number;
  name: string;
}

interface TmdbProductionCompany {
  readonly id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface TmdbProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface TmdbSpokenLanguage {
  iso_639_1: string;
  name: string;
}

export interface TmdbCredit {
  readonly id: number;
  readonly credit_id: string;
  adult: boolean;
  gender: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  character: string;
  order: number;
}

export interface TmdbVideo {
  readonly id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

export interface TmdbSearchQuery {
  query: string;
  language?: string;
  page?: number;
  include_adult?: boolean;
  region?: string;
  year?: number;
  primary_release_year?: number;
}

// === Movies ===
export interface TmdbMovie {
  readonly id: number;
  readonly genre_ids: number[];
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: string;
  vote_average: number;
}

export interface TmdbMovieDetail {
  readonly id: number;
  readonly imdb_id: string;
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: TmdbGenre[];
  homepage: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: 0.5;
  poster_path: null;
  production_companies: TmdbProductionCompany[];
  production_countries: TmdbProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: TmdbSpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
}

// === TV shows ===
export interface TmdbTvShow {
  readonly id: number;
  poster_path: string;
  popularity: number;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  first_air_date: string;
  origin_country: string[];
  genre_ids: number[];
  original_language: string;
  vote_count: number;
  name: string;
  original_name: string;
}

interface TmdbCreatedBy {
  readonly id: number;
  readonly credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

interface TmdbNetwork {
  readonly id: number;
  name: string;
  logo_path: string;
  origin_country: string;
}

interface TmdbLastEpisodeToAir {
  readonly id: number;
  air_date: string;
  episode_number: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

interface TmdbSeason {
  readonly id: number;
  air_date: string;
  episode_count: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface TmdbTvShowDetail {
  readonly id: number;
  backdrop_path: string;
  created_by: TmdbCreatedBy[];
  episode_run_time: number[];
  first_air_date: string;
  genres: TmdbGenre[];
  homepage: string;
  in_production: false;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: TmdbLastEpisodeToAir;
  name: string;
  next_episode_to_air: null;
  networks: TmdbNetwork[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: TmdbProductionCompany[];
  production_countries: TmdbProductionCountry[];
  seasons: TmdbSeason[];
  spoken_languages: Array<
    TmdbSpokenLanguage & {
      english_name: string;
    }
  >;
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

// === Movie responses ===
export interface TmdbGetMoviesResponse {
  page: number;
  results: TmdbMovie[];
  total_results: number;
  total_pages: number;
}

export interface TmdbGetMovieCreditsResponse {
  readonly id: number;
  cast: Array<
    TmdbCredit & {
      readonly cast_id: number;
    }
  >;
}

export interface TmdbGetMovieVideosResponse {
  readonly id: number;
  results: TmdbVideo[];
}

export interface TmdbGetTvShowsResponse {
  page: number;
  results: TmdbTvShow[];
  total_results: number;
  total_pages: number;
}

// === TV shows responses ===
export interface TmdbGetTvShowVideosResponse {
  readonly id: number;
  results: TmdbVideo[];
}

export interface TmdbGetTvShowCreditsResponse {
  readonly id: number;
  cast: TmdbCredit[];
}
