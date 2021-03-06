import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// next redux wrapper
import { HYDRATE } from 'next-redux-wrapper';

// types
import {
  MoviesInitState,
  DefaultMovies,
  DefaultTvShows,
  GetMoviesPayload,
  GetTvShowsPayload,
  MovieCategoryKeys,
  TvShowCategoryKeys,
} from '@/models/movies';
import {
  TmdbGetMoviesResponse,
  TmdbGetTvShowsResponse,
  TmdbSearchPayload,
} from '@/models/tmdb';
import { HydrateResponse } from '@/models/common';

import { filterMovies, filterTvShows } from '@/helpers/filterMovies';
import { addLoading, removeLoading } from '@/helpers/reduxStateLoadings';

export const movieCategoryKeys: MovieCategoryKeys = {
  popular: 'popular',
  topRated: 'topRated',
  upcoming: 'upcoming',
  nowPlaying: 'nowPlaying',
  similar: 'similar',
};

export const tvShowCategoryKeys: TvShowCategoryKeys = {
  popular: 'popular',
  topRated: 'topRated',
  onTheAir: 'onTheAir',
  airingToday: 'airingToday',
  similar: 'similar',
};

export const actions = {
  getMovies: 'getMovies',
  getTvShows: 'getTvShows',
  searchMovies: 'searchMovies',
};

const defaultMovies: DefaultMovies = {
  page: 0,
  movies: [],
  totalMovies: 0,
  totalPages: 0,
};

const defaultTvShows: DefaultTvShows = {
  page: 0,
  tvShows: [],
  totalTvShows: 0,
  totalPages: 0,
};

const initialState: MoviesInitState = {
  movieCategories: {
    popular: defaultMovies,
    topRated: defaultMovies,
    upcoming: defaultMovies,
    nowPlaying: defaultMovies,
    similar: defaultMovies,
  },
  tvShowCategories: {
    popular: defaultTvShows,
    topRated: defaultTvShows,
    onTheAir: defaultTvShows,
    airingToday: defaultTvShows,
    similar: defaultTvShows,
  },
  searchedMovies: defaultMovies,
  loadings: [],
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    getMoviesRequest: (state, action: PayloadAction<GetMoviesPayload>) => {
      addLoading(state, actions.getMovies);
    },
    getMoviesSuccess: (
      state,
      action: PayloadAction<{
        moviesType: keyof typeof movieCategoryKeys;
        movies: TmdbGetMoviesResponse;
      }>
    ) => {
      const { moviesType, movies } = action.payload;
      const { page, results, total_pages, total_results } = movies;

      state.movieCategories[moviesType] = {
        page,
        movies: filterMovies(results),
        totalMovies: total_results,
        totalPages: total_pages,
      };

      removeLoading(state, actions.getMovies);
    },
    getMoviesFailed: (state) => {
      removeLoading(state, actions.getMovies);
    },

    getSimilarMoviesRequest: (state, action: PayloadAction<string>) => {
      addLoading(state, actions.getMovies);
    },

    searchMoviesRequest: (state, action: PayloadAction<TmdbSearchPayload>) => {
      addLoading(state, actions.searchMovies);
    },
    searchMoviesSuccess: (
      state,
      action: PayloadAction<TmdbGetMoviesResponse>
    ) => {
      const { page, results, total_pages, total_results } = action.payload;

      state.searchedMovies = {
        page,
        movies: [...state.searchedMovies.movies, ...filterMovies(results)],
        totalPages: total_pages,
        totalMovies: total_results,
      };

      removeLoading(state, actions.searchMovies);
    },
    searchMoviesFailed: (state) => {
      removeLoading(state, actions.searchMovies);
    },

    getTvShowsRequest: (state, action: PayloadAction<GetTvShowsPayload>) => {
      addLoading(state, actions.getTvShows);
    },
    getTvShowsSuccess: (
      state,
      action: PayloadAction<{
        tvShowsType: keyof typeof tvShowCategoryKeys;
        tvShows: TmdbGetTvShowsResponse;
      }>
    ) => {
      const { tvShowsType, tvShows } = action.payload;
      const { page, results, total_pages, total_results } = tvShows;

      state.tvShowCategories[tvShowsType] = {
        page,
        tvShows: filterTvShows(results),
        totalTvShows: total_results,
        totalPages: total_pages,
      };

      removeLoading(state, actions.getTvShows);
    },
    getTvShowsFailed: (state) => {
      removeLoading(state, actions.getTvShows);
    },

    getSimilarTvShowsRequest: (state, action: PayloadAction<string>) => {
      addLoading(state, actions.getTvShows);
    },

    clearSearchedMovies: (state) => {
      return {
        ...state,
        searchedMovies: {
          page: 0,
          movies: [],
          totalPages: 0,
          totalMovies: 0,
        },
      };
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action: PayloadAction<HydrateResponse>) => {
      return { ...state, ...action.payload.movies };
    },
  },
});

export const movieActions = moviesSlice.actions;

export default moviesSlice.reducer;
