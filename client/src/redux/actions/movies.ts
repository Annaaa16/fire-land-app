// types
import { GetMovies, GetTvShows } from '@/models/movies';
import { TmdbSearchQuery } from '@/models/tmdb';

export const getMovies = {
  request: (payload?: GetMovies) => ({
    type: 'getMovies/request',
    payload,
  }),
  success: () => ({
    type: 'getMovies/success',
  }),
  failure: () => ({
    type: 'getMovies/failure',
  }),
};

export const getSimilarMovies = {
  request: (payload?: string) => ({
    type: 'getSimilarMovies/request',
    payload,
  }),
  success: () => ({
    type: 'getSimilarMovies/success',
  }),
  failure: () => ({
    type: 'getSimilarMovies/failure',
  }),
};

export const searchMovies = {
  request: (payload?: TmdbSearchQuery) => ({
    type: 'searchMovies/request',
    payload,
  }),
  success: () => ({
    type: 'searchMovies/success',
  }),
  failure: () => ({
    type: 'searchMovies/failure',
  }),
};

export const getTvShows = {
  request: (payload?: GetTvShows) => ({
    type: 'getTvShows/request',
    payload,
  }),
  success: () => ({
    type: 'getTvShows/success',
  }),
  failure: () => ({
    type: 'getTvShows/failure',
  }),
};

export const getSimilarTvShows = {
  request: (payload?: string) => ({
    type: 'getSimilarTvShows/request',
    payload,
  }),
  success: () => ({
    type: 'getSimilarTvShows/success',
  }),
  failure: () => ({
    type: 'getSimilarTvShows/failure',
  }),
};
