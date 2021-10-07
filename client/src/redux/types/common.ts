// types
import { AuthInitState } from './auth';
import { PostsInitState } from './posts';

export interface HydrateResponse {
  auth: AuthInitState;
  posts: PostsInitState;
}
