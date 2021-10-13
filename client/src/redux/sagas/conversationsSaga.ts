import { call, put, takeLatest } from '@redux-saga/core/effects';

// types
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import {
  CreateConversation,
  GetConversationsResponse,
} from '@/models/conversations';

import { conversationsApiClient } from '@/apis/conversationsApi';
import { setConversations } from '../slices/conversationsSlice';
import { createConversation, getConversations } from '../actions/conversations';

const { reqCreateConversation, reqGetConversations } = conversationsApiClient();

function* handleReqCreateConv(action: PayloadAction<CreateConversation>) {
  try {
    const memberIds = action.payload;

    const response: AxiosResponse<GetConversationsResponse> = yield call(
      reqCreateConversation,
      memberIds
    );

    yield put(setConversations(response.data));
  } catch (error) {
    console.log('Create conversation error 👉', error);
  }
}

function* handleReqGetConvs(action: PayloadAction<string>) {
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
  yield takeLatest(createConversation.request().type, handleReqCreateConv);
  yield takeLatest(getConversations.request().type, handleReqGetConvs);
}

export default conversationSaga;
