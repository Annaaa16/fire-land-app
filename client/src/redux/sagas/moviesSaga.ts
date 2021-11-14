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
  moviesActions,
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
      moviesActions.getMoviesSuccess({ moviesType, movies: response.data })
    );
  } catch (error) {
    notifySagaError(moviesActions.getMoviesFailed, error);
    yield put(moviesActions.getMoviesFailed());
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
      moviesActions.getMoviesSuccess({
        moviesType: movieCategoryKeys.similar,
        movies: response.data,
      })
    );
  } catch (error) {
    notifySagaError(moviesActions.getMoviesFailed, error);
    yield put(moviesActions.getMoviesFailed());
  }
}

function* handleSearchMoviesRequest(action: PayloadAction<TmdbSearchPayload>) {
  try {
    const response: AxiosResponse<TmdbGetMoviesResponse> = yield call(
      searchMovies,
      action.payload
    );

    yield put(moviesActions.searchMoviesSuccess(response.data));
  } catch (error) {
    notifySagaError(moviesActions.searchMoviesFailed, error);
    yield put(moviesActions.searchMoviesFailed());
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
      moviesActions.getTvShowsSuccess({ tvShowsType, tvShows: response.data })
    );
  } catch (error) {
    notifySagaError(moviesActions.getTvShowsFailed, error);
    yield put(moviesActions.getTvShowsFailed());
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
      moviesActions.getTvShowsSuccess({
        tvShowsType: tvShowCategoryKeys.similar,
        tvShows: response.data,
      })
    );
  } catch (error) {
    notifySagaError(moviesActions.getTvShowsFailed, error);
    yield put(moviesActions.getTvShowsFailed());
  }
}

function* moviesSaga() {
  yield takeLatest(moviesActions.getMoviesRequest, handleGetMoviesRequest);
  yield takeLatest(
    moviesActions.getSimilarMoviesRequest,
    handleGetSimilarMoviesRequest
  );
  yield takeLatest(
    moviesActions.searchMoviesRequest,
    handleSearchMoviesRequest
  );
  yield takeEvery(moviesActions.getTvShowsRequest, handleGetTvShowsRequest);
  yield takeLatest(
    moviesActions.getSimilarTvShowsRequest,
    handleGetSimilarTvShowsRequest
  );
}

export default moviesSaga;
