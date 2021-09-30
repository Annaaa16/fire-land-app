import { StoreState } from '../types';

export const authState$ = (state: StoreState) => state.auth;

export const postsState$ = (state: StoreState) => state.posts;
