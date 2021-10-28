import { combineReducers } from '@reduxjs/toolkit';

import globalReducer from '../slices/globalSlice';
import authReducer from '../slices/authSlice';
import usersReducer from '../slices/usersSlice';
import postsReducer from '../slices/postsSlice';
import messengerReducer from '../slices/messengerSlice';
import conversationsReducer from '../slices/conversationsSlice';
import commentsReducer from '../slices/commentsSlice';
import tmdbReducer from '../slices/tmdbSlice';

const rootReducer = combineReducers({
  global: globalReducer,
  auth: authReducer,
  users: usersReducer,
  posts: postsReducer,
  messenger: messengerReducer,
  conversations: conversationsReducer,
  comments: commentsReducer,
  tmdb: tmdbReducer,
});

export default rootReducer;
