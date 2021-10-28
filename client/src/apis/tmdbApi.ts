import { axiosTmdb } from './axiosTmdb';

// types
import { AxiosError } from 'axios';
import {
  GetCastListResponse,
  GetMovieDetailResponse,
  GetMovieListResponse,
  GetVideosResponse,
  Params,
} from '@/models/tmdb';

import { notifyAxiosError } from '@/helpers/notify';

export const tmdbApiClient = () => {
  return {
    getMovies: async (query: string, params: Params) => {
      try {
        const response = await axiosTmdb.get<GetMovieListResponse>(
          '/movie/' + query,
          {
            params,
          }
        );

        return response;
      } catch (error) {
        notifyAxiosError('Get movie list', error as AxiosError);
      }
    },

    getSimilarMovies: async (movieId: string) => {
      try {
        const response = await axiosTmdb.get<GetMovieListResponse>(
          `/movie/${movieId}/similar`,
          { params: {} }
        );

        return response;
      } catch (error) {
        notifyAxiosError('Get similar list', error as AxiosError);
      }
    },

    getMovieDetail: async (movieId: string) => {
      try {
        const response = await axiosTmdb.get<GetMovieDetailResponse>(
          '/movie/' + movieId,
          { params: {} }
        );

        return response;
      } catch (error) {
        notifyAxiosError('Get movie detail', error as AxiosError);
      }
    },

    getCasts: async (movieId: string) => {
      try {
        const response = await axiosTmdb.get<GetCastListResponse>(
          `/movie/${movieId}/credits`,
          { params: {} }
        );

        return response;
      } catch (error) {
        notifyAxiosError('Get movie detail', error as AxiosError);
      }
    },

    getVideos: async (movieId: string) => {
      try {
        const response = await axiosTmdb.get<GetVideosResponse>(
          `/movie/${movieId}/videos`,
          { params: {} }
        );

        return response;
      } catch (error) {
        notifyAxiosError('Get movie detail', error as AxiosError);
      }
    },
  };
};
