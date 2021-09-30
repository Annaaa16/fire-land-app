// types
import { Post } from '@/models/common';

export interface PostsInitState {
  success: boolean;
  prevPage: number | null;
  nextPage: number | null;
  total: number;
  posts: Post[];
  updatePost: Post | null;
}
