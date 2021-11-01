import { axiosTmdb } from './axiosTmdb';

// types
import { AxiosError } from 'axios';
import {
  TmdbGetTvShowCreditsResponse,
  TmdbGetTvShowVideosResponse,
  TmdbParams,
  TmdbSearchQuery,
  TmdbTvShowDetail,
} from '@/models/tmdb';
import {
  TmdbGetMovieCreditsResponse,
  TmdbGetMoviesResponse,
  TmdbGetMovieVideosResponse,
  TmdbGetTvShowsResponse,
  TmdbMovieDetail,
} from '@/models/tmdb';

import { notifyAxiosError } from '@/helpers/notify';

export const moviesApi = () => {
  return {
    // === Movies ===
    getMovies: async (query: string, params: TmdbParams) => {
      try {
        const response = await axiosTmdb.get<TmdbGetMoviesResponse>(
          '/movie/' + query,
          { params }
        );
        return response;
      } catch (error) {
        notifyAxiosError('Get movies', error as AxiosError);
      }
    },

    getSimilarMovies: async (movieId: string) => {
      try {
        const response = await axiosTmdb.get<TmdbGetMoviesResponse>(
          `/movie/${movieId}/similar`,
          { params: {} }
        );

        console.log('response', response.data);
        return response;
      } catch (error) {
        notifyAxiosError('Get similar movies', error as AxiosError);
      }
    },

    getMovieDetail: async (movieId: string) => {
      try {
        const response = await axiosTmdb.get<TmdbMovieDetail>(
          '/movie/' + movieId,
          { params: {} }
        );

        return response;
      } catch (error) {
        notifyAxiosError('Get movie detail', error as AxiosError);
      }
    },

    getMovieCasts: async (movieId: string) => {
      try {
        const response = await axiosTmdb.get<TmdbGetMovieCreditsResponse>(
          `/movie/${movieId}/credits`,
          { params: {} }
        );

        return response;
      } catch (error) {
        notifyAxiosError('Get movie casts', error as AxiosError);
      }
    },

    getMovieVideos: async (movieId: string) => {
      try {
        const response = await axiosTmdb.get<TmdbGetMovieVideosResponse>(
          `/movie/${movieId}/videos`,
          { params: {} }
        );

        return response;
      } catch (error) {
        notifyAxiosError('Get movie videos', error as AxiosError);
      }
    },

    searchMovies: async (params: TmdbSearchQuery) => {
      try {
        const response = await axiosTmdb.get<TmdbGetMoviesResponse>(
          '/search/movie',
          { params }
        );

        return response;
      } catch (error) {
        notifyAxiosError('Search movie', error as AxiosError);
      }
    },

    // === Tv Shows ===
    getTvShows: async (query: string, params: TmdbParams) => {
      try {
        const response = await axiosTmdb.get<TmdbGetTvShowsResponse>(
          '/tv/' + query,
          { params }
        );

        return response;
      } catch (error) {
        notifyAxiosError('Get shows', error as AxiosError);
      }
    },

    getSimilarTvShows: async (showId: string) => {
      try {
        const response = await axiosTmdb.get<TmdbGetMoviesResponse>(
          `/tv/${showId}/similar`,
          { params: {} }
        );

        return response;
      } catch (error) {
        notifyAxiosError('Get similar shows', error as AxiosError);
      }
    },

    getTvShowDetail: async (showId: string) => {
      try {
        const response = await axiosTmdb.get<TmdbTvShowDetail>(
          '/tv/' + showId,
          { params: {} }
        );

        return response;
      } catch (error) {
        notifyAxiosError('Get show detail', error as AxiosError);
      }
    },

    getTvShowCasts: async (showId: string) => {
      try {
        const response = await axiosTmdb.get<TmdbGetTvShowCreditsResponse>(
          `/tv/${showId}/credits`,
          { params: {} }
        );

        return response;
      } catch (error) {
        notifyAxiosError('Get show casts', error as AxiosError);
      }
    },

    getTvShowVideos: async (showId: string) => {
      try {
        const response = await axiosTmdb.get<TmdbGetTvShowVideosResponse>(
          `/tv/${showId}/videos`,
          { params: {} }
        );

        return response;
      } catch (error) {
        notifyAxiosError('Get show videos', error as AxiosError);
      }
    },
  };
};
