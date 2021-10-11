import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '../slices/authSlice';
import postsReducer from '../slices/postsSlice';
import messengerReducer from '../slices/messengerSlice';
import conversationsReducer from '../slices/conversationsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  messenger: messengerReducer,
  conversations: conversationsReducer,
});

export default rootReducer;
