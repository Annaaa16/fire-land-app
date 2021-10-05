import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from 'next-redux-cookie-wrapper';

// types
import { WrapperStore, SagaStore } from './types';

import { createPost, updatePost } from './actions/posts';
import rootSaga from './sagas/rootSaga';
import rootReducer from './reducers';

// Create the middleware
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [createPost.request().type, updatePost.request().type], // Allow FormData type
      },
    })
      .prepend(
        nextReduxCookieMiddleware({
          subtrees: ['my.subtree'],
        })
      )
      .concat(sagaMiddleware),
  // devTools: process.env.NODE_ENV !== 'production',
});

export const makeStore = wrapMakeStore(() => {
  // Run saga on server
  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  return store;
});

export const wrapper = createWrapper<WrapperStore>(makeStore);

export default store;
