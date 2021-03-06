import { useSelector } from 'react-redux';

// types
import { StoreState } from '@/models/store';

export const useAuthSelector = () =>
  useSelector((state: StoreState) => state.auth);

export const useUsersSelector = () =>
  useSelector((state: StoreState) => state.users);

export const usePostsSelector = () =>
  useSelector((state: StoreState) => state.posts);

export const useMessengerSelector = () =>
  useSelector((state: StoreState) => state.messenger);

export const useConversationsSelector = () =>
  useSelector((state: StoreState) => state.conversations);

export const useCommentsSelector = () =>
  useSelector((state: StoreState) => state.comments);

export const useMoviesSelector = () =>
  useSelector((state: StoreState) => state.movies);

export const useProductsSelector = () =>
  useSelector((state: StoreState) => state.products);

export const useReviewsSelector = () =>
  useSelector((state: StoreState) => state.reviews);

export const useNotificationsSelector = () =>
  useSelector((state: StoreState) => state.notifications);
