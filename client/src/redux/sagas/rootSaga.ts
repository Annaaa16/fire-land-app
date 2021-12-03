import { all } from '@redux-saga/core/effects';

import authSaga from './authSaga';
import postsSaga from './postsSaga';
import conversationsSaga from './conversationsSaga';
import messengerSaga from './messengerSaga';
import usersSaga from './usersSaga';
import commentsSaga from './commentsSaga';
import moviesSaga from './moviesSaga';
import productsSaga from './productsSaga';

function* watcherSaga() {
  yield all([
    authSaga(),
    postsSaga(),
    conversationsSaga(),
    messengerSaga(),
    usersSaga(),
    commentsSaga(),
    moviesSaga(),
    productsSaga(),
  ]);
}

export default watcherSaga;
