import { call, put, takeEvery, takeLatest } from '@redux-saga/core/effects';

// types
import { AxiosResponse } from 'axios';
import { TmdbGetMoviesResponse, TmdbGetTvShowsResponse } from '@/models/tmdb';
import { PayloadAction } from '@reduxjs/toolkit';
import { GetMovies, GetTvShows } from '@/models/movies';

import { moviesApiClient } from '@/apis/moviesApi';
import {
  movieCategoryKeys,
  setMovies,
  setTvShows,
  tvShowCategoryKeys,
} from '../slices/moviesSlice';
import {
  getMovies as getMoviesAct,
  getSimilarMovies as getSimilarMoviesAct,
  getTvShows as getTvShowsAct,
  getSimilarTvShows as getSimilarTvShowsAct,
} from '../actions/movies';

const { getMovies, getSimilarMovies, getTvShows, getSimilarTvShows } =
  moviesApiClient();

function* handleGetMovies(action: PayloadAction<GetMovies>) {
  const { query, params, moviesType } = action.payload;

  const response: AxiosResponse<TmdbGetMoviesResponse> = yield call(
    getMovies,
    query,
    params
  );

  yield put(setMovies({ moviesType, movies: response.data }));
}

function* handleGetSimilarMovies(action: PayloadAction<string>) {
  const movieId = action.payload;

  const response: AxiosResponse<TmdbGetMoviesResponse> = yield call(
    getSimilarMovies,
    movieId
  );

  yield put(
    setMovies({ moviesType: movieCategoryKeys.similar, movies: response.data })
  );
}

function* handleGetShows(action: PayloadAction<GetTvShows>) {
  const { query, params, tvShowsType } = action.payload;

  const response: AxiosResponse<TmdbGetTvShowsResponse> = yield call(
    getTvShows,
    query,
    params
  );

  yield put(setTvShows({ tvShowsType, tvShows: response.data }));
}

function* handleGetSimilarTvShows(action: PayloadAction<string>) {
  const tvShowId = action.payload;

  const response: AxiosResponse<TmdbGetTvShowsResponse> = yield call(
    getSimilarTvShows,
    tvShowId
  );

  yield put(
    setTvShows({
      tvShowsType: tvShowCategoryKeys.similar,
      tvShows: response.data,
    })
  );
}

function* moviesSaga() {
  yield takeLatest(getMoviesAct.request().type, handleGetMovies);
  yield takeLatest(getSimilarMoviesAct.request().type, handleGetSimilarMovies);
  yield takeEvery(getTvShowsAct.request().type, handleGetShows);
  yield takeLatest(
    getSimilarTvShowsAct.request().type,
    handleGetSimilarTvShows
  );
}

export default moviesSaga;
