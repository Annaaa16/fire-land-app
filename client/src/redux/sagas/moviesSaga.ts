import { call, put, takeEvery, takeLatest } from '@redux-saga/core/effects';

// types
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
    const response: TmdbGetMoviesResponse = yield call(
      getMovies,
      query,
      params
    );

    yield put(movieActions.getMoviesSuccess({ moviesType, movies: response }));
  } catch (error) {
    yield put(movieActions.getMoviesFailed());
  }
}

function* handleGetSimilarMoviesRequest(action: PayloadAction<string>) {
  const movieId = action.payload;

  try {
    const response: TmdbGetMoviesResponse = yield call(
      getSimilarMovies,
      movieId
    );

    yield put(
      movieActions.getMoviesSuccess({
        moviesType: movieCategoryKeys.similar,
        movies: response,
      })
    );
  } catch (error) {
    yield put(movieActions.getMoviesFailed());
  }
}

function* handleSearchMoviesRequest(action: PayloadAction<TmdbSearchPayload>) {
  try {
    const response: TmdbGetMoviesResponse = yield call(
      searchMovies,
      action.payload
    );

    yield put(movieActions.searchMoviesSuccess(response));
  } catch (error) {
    yield put(movieActions.searchMoviesFailed());
  }
}

function* handleGetTvShowsRequest(action: PayloadAction<GetTvShowsPayload>) {
  const { query, params, tvShowsType } = action.payload;

  try {
    const response: TmdbGetTvShowsResponse = yield call(
      getTvShows,
      query,
      params
    );

    yield put(
      movieActions.getTvShowsSuccess({ tvShowsType, tvShows: response })
    );
  } catch (error) {
    yield put(movieActions.getTvShowsFailed());
  }
}

function* handleGetSimilarTvShowsRequest(action: PayloadAction<string>) {
  const tvShowId = action.payload;

  try {
    const response: TmdbGetTvShowsResponse = yield call(
      getSimilarTvShows,
      tvShowId
    );

    yield put(
      movieActions.getTvShowsSuccess({
        tvShowsType: tvShowCategoryKeys.similar,
        tvShows: response,
      })
    );
  } catch (error) {
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
