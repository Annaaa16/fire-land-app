// types
import { Store } from 'redux';
import { Task } from '@redux-saga/types';

import store, { makeStore } from '@/redux/store';

export interface SagaStore extends Store {
  sagaTask?: Task;
}

export type WrapperStore = ReturnType<typeof makeStore>;

export type StoreState = ReturnType<typeof store.getState>;

export type StoreDispatch = typeof store.dispatch;
