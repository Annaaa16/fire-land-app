// types
import { AuthInitState } from '@/models/auth';
import { CommentsInitState } from '@/models/comments';
import { ConversationsInitState } from '@/models/conversations';
import { MessengerInitState } from '@/models/messenger';
import { MoviesInitState } from '@/models/movies';
import { PostsInitState } from '@/models/posts';
import { ProductsInitState } from '@/models/products';
import { UsersInitState } from '@/models/users';

type InitState =
  | AuthInitState
  | CommentsInitState
  | ConversationsInitState
  | MessengerInitState
  | UsersInitState
  | PostsInitState
  | MoviesInitState
  | ProductsInitState;

export const addLoading = (state: InitState, loading: string) => {
  state.loadings.push(loading);
};

export const removeLoading = (state: InitState, loading: string) => {
  state.loadings = state.loadings.filter((item) => item !== loading);
};
