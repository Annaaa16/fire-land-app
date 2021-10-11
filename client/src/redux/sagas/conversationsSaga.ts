import { call, put, takeLatest } from '@redux-saga/core/effects';

// types
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { GetConversationsResponse } from '@/models/conversations';

import { conversationApiClient } from '@/apis/conversationApi';
import { setConversations } from '../slices/conversationsSlice';
import { getConversations } from '../actions/conversations';

const { reqGetConversations } = conversationApiClient();

function* handleReqGetConversations(action: PayloadAction<string>) {
  try {
    const userId = action.payload;

    const response: AxiosResponse<GetConversationsResponse> = yield call(
      reqGetConversations,
      userId
    );

    yield put(setConversations(response.data));
  } catch (error) {
    console.log('Get conversations error 👉', error);
  }
}

function* conversationSaga() {
  yield takeLatest(getConversations.request().type, handleReqGetConversations);
}

export default conversationSaga;
