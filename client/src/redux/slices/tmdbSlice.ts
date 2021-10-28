import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// next redux wrapper
import { HYDRATE } from 'next-redux-wrapper';

// types
import {
  GetCastListResponse,
  GetMovieDetailResponse,
  GetMovieListResponse,
  GetVideosResponse,
  TmdbInitState,
} from '@/models/tmdb';
import { HydrateResponse } from '@/models/common';

export const movieTypes = {
  popular: 'popular',
  upcoming: 'upcoming',
  topRated: 'topRated',
  similar: 'similar',
};

const initialState: TmdbInitState = {
  movieList: {
    [movieTypes.popular]: {
      page: 0,
      movies: [],
      totalMovies: 0,
      totalPages: 0,
    },
    [movieTypes.upcoming]: {
      page: 0,
      movies: [],
      totalMovies: 0,
      totalPages: 0,
    },
    [movieTypes.topRated]: {
      page: 0,
      movies: [],
      totalMovies: 0,
      totalPages: 0,
    },
    [movieTypes.similar]: {
      page: 0,
      movies: [],
      totalMovies: 0,
      totalPages: 0,
    },
  },
  movieDetail: {
    id: '',
    title: '',
    overview: '',
    image: '',
    casts: [],
    videos: [],
    genres: [],
  },
};

const tmdbSlice = createSlice({
  name: 'tmdb',
  initialState,
  reducers: {
    setMovieList: (
      state,
      action: PayloadAction<{
        listType: string;
        movies: GetMovieListResponse;
      }>
    ) => {
      const { listType, movies } = action.payload;
      const { page, results, total_pages, total_results } = movies;

      state.movieList[listType] = {
        page,
        movies: results,
        totalMovies: total_results,
        totalPages: total_pages,
      };
    },

    setMovieDetail: (
      state,
      action: PayloadAction<{
        casts: GetCastListResponse;
        detail: GetMovieDetailResponse;
        videos: GetVideosResponse;
      }>
    ) => {
      const { casts, detail, videos } = action.payload;
      const { id, overview, title, backdrop_path, genres } = detail;

      const filteredCasts = casts.cast.map((cast) => ({
        id: cast.id.toString(),
        name: cast.name,
        image: cast.profile_path,
      }));

      const filteredVideos = videos.results.map((video) => ({
        id: video.id.toString(),
        name: video.name,
        path: video.key,
      }));

      const filteredGenres = genres.map((genre) => ({
        id: genre.id.toString(),
        name: genre.name,
      }));

      state.movieDetail = {
        id: id.toString(),
        title,
        overview,
        image: backdrop_path,
        casts: filteredCasts,
        videos: filteredVideos,
        genres: filteredGenres,
      };
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action: PayloadAction<HydrateResponse>) => {
      return { ...state, ...action.payload.tmdb };
    },
  },
});

export const { setMovieList, setMovieDetail } = tmdbSlice.actions;

export default tmdbSlice.reducer;
