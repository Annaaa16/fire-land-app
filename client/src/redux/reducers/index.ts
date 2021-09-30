import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '../slices/authSlice';
import postsReducer from '../slices/postsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
});

export default rootReducer;
