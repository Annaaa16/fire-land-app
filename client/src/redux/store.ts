import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';

import watcherSaga from './sagas/rootSaga';
import rootReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(watcherSaga);

export default store;
