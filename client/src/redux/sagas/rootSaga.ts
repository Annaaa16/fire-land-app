import { all } from '@redux-saga/core/effects';

import authSaga from './authSaga';
import postsSaga from './postsSaga';
import conversationsSaga from './conversationsSaga';
import messengerSaga from './messengerSaga';
import usersSaga from './usersSaga';

function* watcherSaga() {
  yield all([
    authSaga(),
    postsSaga(),
    conversationsSaga(),
    messengerSaga(),
    usersSaga(),
  ]);
}

export default watcherSaga;
