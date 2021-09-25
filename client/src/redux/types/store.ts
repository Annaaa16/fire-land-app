import store from '../store';

export type StoreState = ReturnType<typeof store.getState>;

export type MyDispatch = typeof store.dispatch;
