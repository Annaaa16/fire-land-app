import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '../slices/authSlice';
import usersReducer from '../slices/usersSlice';
import postsReducer from '../slices/postsSlice';
import messengerReducer from '../slices/messengerSlice';
import conversationsReducer from '../slices/conversationsSlice';
import commentsReducer from '../slices/commentsSlice';
import moviesReducer from '../slices/moviesSlice';
import productsReducer from '../slices/productsSlice';
import reviewsReducer from '../slices/reviewsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  posts: postsReducer,
  messenger: messengerReducer,
  conversations: conversationsReducer,
  comments: commentsReducer,
  movies: moviesReducer,
  products: productsReducer,
  reviews: reviewsReducer,
});

export default rootReducer;
