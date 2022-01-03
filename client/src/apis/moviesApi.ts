import { axiosTmdb } from './axiosTmdb';

// types
import {
  TmdbGetTvShowCreditsResponse,
  TmdbGetTvShowVideosResponse,
  TmdbParams,
  TmdbSearchPayload,
  TmdbTvShowDetail,
} from '@/models/tmdb';
import {
  TmdbGetMovieCreditsResponse,
  TmdbGetMoviesResponse,
  TmdbGetMovieVideosResponse,
  TmdbGetTvShowsResponse,
  TmdbMovieDetail,
} from '@/models/tmdb';

export const moviesApi = () => {
  return {
    // === Movies ===
    getMovies(
      endpoint: string,
      params: TmdbParams
    ): Promise<TmdbGetMoviesResponse> {
      return axiosTmdb.get('/movie/' + endpoint, { params });
    },

    getSimilarMovies(movieId: string): Promise<TmdbGetMoviesResponse> {
      return axiosTmdb.get(`/movie/${movieId}/similar`, {
        params: {},
      });
    },

    getMovieDetail(movieId: string): Promise<TmdbMovieDetail> {
      return axiosTmdb.get('/movie/' + movieId, { params: {} });
    },

    getMovieCasts(movieId: string): Promise<TmdbGetMovieCreditsResponse> {
      return axiosTmdb.get(`/movie/${movieId}/credits`, {
        params: {},
      });
    },

    getMovieVideos(movieId: string): Promise<TmdbGetMovieVideosResponse> {
      return axiosTmdb.get(`/movie/${movieId}/videos`, {
        params: {},
      });
    },

    searchMovies(params: TmdbSearchPayload): Promise<TmdbGetMoviesResponse> {
      return axiosTmdb.get('/search/movie', { params });
    },

    // === Tv Shows ===
    getTvShows(
      query: string,
      params: TmdbParams
    ): Promise<TmdbGetTvShowsResponse> {
      return axiosTmdb.get('/tv/' + query, { params });
    },

    getSimilarTvShows(showId: string): Promise<TmdbGetMoviesResponse> {
      return axiosTmdb.get(`/tv/${showId}/similar`, { params: {} });
    },

    getTvShowDetail(showId: string): Promise<TmdbTvShowDetail> {
      return axiosTmdb.get('/tv/' + showId, { params: {} });
    },

    getTvShowCasts(showId: string): Promise<TmdbGetTvShowCreditsResponse> {
      return axiosTmdb.get(`/tv/${showId}/credits`, { params: {} });
    },

    getTvShowVideos(showId: string): Promise<TmdbGetTvShowVideosResponse> {
      return axiosTmdb.get(`/tv/${showId}/videos`, { params: {} });
    },
  };
};
