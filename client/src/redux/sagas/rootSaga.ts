import { all } from '@redux-saga/core/effects';

import authSaga from './authSaga';
import postsSaga from './postsSaga';
import conversationsSaga from './conversationsSaga';
import messengerSaga from './messengerSaga';

function* watcherSaga() {
  yield all([authSaga(), postsSaga(), conversationsSaga(), messengerSaga()]);
}

export default watcherSaga;
