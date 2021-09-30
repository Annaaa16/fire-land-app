import { all } from '@redux-saga/core/effects';

import authSaga from './authSaga';
import postsSaga from './postsSaga';

function* watcherSaga() {
  yield all([authSaga(), postsSaga()]);
}

export default watcherSaga;
