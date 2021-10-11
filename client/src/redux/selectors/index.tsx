// types
import { StoreState } from '@/models/store';

export const authState$ = (state: StoreState) => state.auth;

export const postsState$ = (state: StoreState) => state.posts;

export const messengerState$ = (state: StoreState) => state.messenger;

export const conversationsState$ = (state: StoreState) => state.conversations;
