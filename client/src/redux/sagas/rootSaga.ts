import { all } from '@redux-saga/core/effects';
import authSaga from './authSaga';

function* watcherSaga() {
  yield all([authSaga()]);
}

export default watcherSaga;
