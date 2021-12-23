import { call, put, takeEvery, takeLatest } from '@redux-saga/core/effects';

// types
import { AxiosResponse } from 'axios';
import {
  TmdbGetMoviesResponse,
  TmdbGetTvShowsResponse,
  TmdbSearchPayload,
} from '@/models/tmdb';
import { PayloadAction } from '@reduxjs/toolkit';
import { GetMoviesPayload, GetTvShowsPayload } from '@/models/movies';

import {
  movieCategoryKeys,
  movieActions,
  tvShowCategoryKeys,
} from '../slices/moviesSlice';
import { moviesApi } from '@/apis/moviesApi';
import { notifySagaError } from '@/helpers/notifyError';

const {
  getMovies,
  getSimilarMovies,
  searchMovies,
  getTvShows,
  getSimilarTvShows,
} = moviesApi();

function* handleGetMoviesRequest(action: PayloadAction<GetMoviesPayload>) {
  const { query, params, moviesType } = action.payload;

  try {
    const response: AxiosResponse<TmdbGetMoviesResponse> = yield call(
      getMovies,
      query,
      params
    );

    yield put(
      movieActions.getMoviesSuccess({ moviesType, movies: response.data })
    );
  } catch (error) {
    notifySagaError(movieActions.getMoviesFailed, error);
    yield put(movieActions.getMoviesFailed());
  }
}

function* handleGetSimilarMoviesRequest(action: PayloadAction<string>) {
  const movieId = action.payload;

  try {
    const response: AxiosResponse<TmdbGetMoviesResponse> = yield call(
      getSimilarMovies,
      movieId
    );

    yield put(
      movieActions.getMoviesSuccess({
        moviesType: movieCategoryKeys.similar,
        movies: response.data,
      })
    );
  } catch (error) {
    notifySagaError(movieActions.getMoviesFailed, error);
    yield put(movieActions.getMoviesFailed());
  }
}

function* handleSearchMoviesRequest(action: PayloadAction<TmdbSearchPayload>) {
  try {
    const response: AxiosResponse<TmdbGetMoviesResponse> = yield call(
      searchMovies,
      action.payload
    );

    yield put(movieActions.searchMoviesSuccess(response.data));
  } catch (error) {
    notifySagaError(movieActions.searchMoviesFailed, error);
    yield put(movieActions.searchMoviesFailed());
  }
}

function* handleGetTvShowsRequest(action: PayloadAction<GetTvShowsPayload>) {
  const { query, params, tvShowsType } = action.payload;

  try {
    const response: AxiosResponse<TmdbGetTvShowsResponse> = yield call(
      getTvShows,
      query,
      params
    );

    yield put(
      movieActions.getTvShowsSuccess({ tvShowsType, tvShows: response.data })
    );
  } catch (error) {
    notifySagaError(movieActions.getTvShowsFailed, error);
    yield put(movieActions.getTvShowsFailed());
  }
}

function* handleGetSimilarTvShowsRequest(action: PayloadAction<string>) {
  const tvShowId = action.payload;

  try {
    const response: AxiosResponse<TmdbGetTvShowsResponse> = yield call(
      getSimilarTvShows,
      tvShowId
    );

    yield put(
      movieActions.getTvShowsSuccess({
        tvShowsType: tvShowCategoryKeys.similar,
        tvShows: response.data,
      })
    );
  } catch (error) {
    notifySagaError(movieActions.getTvShowsFailed, error);
    yield put(movieActions.getTvShowsFailed());
  }
}

function* moviesSaga() {
  yield takeLatest(movieActions.getMoviesRequest, handleGetMoviesRequest);
  yield takeLatest(
    movieActions.getSimilarMoviesRequest,
    handleGetSimilarMoviesRequest
  );
  yield takeLatest(movieActions.searchMoviesRequest, handleSearchMoviesRequest);
  yield takeEvery(movieActions.getTvShowsRequest, handleGetTvShowsRequest);
  yield takeLatest(
    movieActions.getSimilarTvShowsRequest,
    handleGetSimilarTvShowsRequest
  );
}

export default moviesSaga;
