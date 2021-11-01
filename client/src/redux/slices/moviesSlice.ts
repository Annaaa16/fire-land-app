import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// next redux wrapper
import { HYDRATE } from 'next-redux-wrapper';

// types
import { HydrateResponse } from '@/models/common';
import {
  MoviesInitState,
  DefaultMovies,
  DefaultTvShows,
  MovieCategoryKeys,
  TvShowCategoryKeys,
} from '@/models/movies';
import {
  TmdbGetMovieCreditsResponse,
  TmdbGetMoviesResponse,
  TmdbGetMovieVideosResponse,
  TmdbGetTvShowCreditsResponse,
  TmdbGetTvShowsResponse,
  TmdbGetTvShowVideosResponse,
  TmdbMovie,
  TmdbMovieDetail,
  TmdbTvShow,
  TmdbTvShowDetail,
} from '@/models/tmdb';

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
  detailInfo: {
    id: '',
    title: '',
    overview: '',
    image: '',
    casts: [],
    videos: [],
    genres: [],
  },
  searchedMovies: defaultMovies,
};

const filterMovies = (movies: TmdbMovie[]) => {
  return movies.map((movie) => {
    const {
      id,
      backdrop_path,
      overview,
      title,
      vote_count,
      release_date,
      popularity,
    } = movie;

    return {
      id: id.toString(),
      image: backdrop_path,
      overview,
      title,
      voteCount: vote_count,
      releaseDate: release_date,
      popularity,
    };
  });
};

const filterTvShows = (tvShows: TmdbTvShow[]) => {
  return tvShows.map((show) => {
    const {
      id,
      backdrop_path,
      overview,
      name,
      vote_count,
      first_air_date,
      popularity,
    } = show;

    return {
      id: id.toString(),
      image: backdrop_path,
      overview,
      title: name,
      voteCount: vote_count,
      releaseDate: first_air_date,
      popularity,
    };
  });
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    // === Movies ===
    setMovies: (
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
    },

    setMovieDetail: (
      state,
      action: PayloadAction<{
        casts: TmdbGetMovieCreditsResponse;
        detail: TmdbMovieDetail;
        videos: TmdbGetMovieVideosResponse;
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

      state.detailInfo = {
        id: id.toString(),
        title,
        overview,
        image: backdrop_path,
        casts: filteredCasts,
        videos: filteredVideos,
        genres: filteredGenres,
      };
    },

    setSearchedMovies: (
      state,
      action: PayloadAction<TmdbGetMoviesResponse>
    ) => {
      const { page, results, total_pages, total_results } = action.payload;

      return {
        ...state,
        searchedMovies: {
          page,
          movies: [...state.searchedMovies.movies, ...filterMovies(results)],
          totalPages: total_pages,
          totalMovies: total_results,
        },
      };
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

    // === Tv Shows ===
    setTvShows: (
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
    },

    setTvShowDetail: (
      state,
      action: PayloadAction<{
        casts: TmdbGetTvShowCreditsResponse;
        detail: TmdbTvShowDetail;
        videos: TmdbGetTvShowVideosResponse;
      }>
    ) => {
      const { casts, detail, videos } = action.payload;
      const { id, overview, name, backdrop_path, genres } = detail;

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

      state.detailInfo = {
        id: id.toString(),
        title: name,
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
      return { ...state, ...action.payload.movies };
    },
  },
});

export const {
  setMovies,
  setMovieDetail,
  setTvShows,
  setTvShowDetail,
  setSearchedMovies,
  clearSearchedMovies,
} = moviesSlice.actions;

export default moviesSlice.reducer;
