import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

// next redux cookie wrapper
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from 'next-redux-cookie-wrapper';

// next redux wrapper
import { createWrapper } from 'next-redux-wrapper';

// types
import { WrapperStore, SagaStore } from '@/models/store';

import { postActions } from './slices/postsSlice';
import { productActions } from './slices/productsSlice';
import rootSaga from './sagas/rootSaga';
import rootReducer from './reducers';

// Create the middleware
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          postActions.createPostRequest.type,
          postActions.updatePostRequest.type,
          productActions.createProductRequest.type,
          productActions.updateProductRequest.type,
        ], // Allow FormData type
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
