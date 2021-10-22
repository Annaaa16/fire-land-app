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
import {
  createConversation as createConversationAct,
  getConversations as getConversationsAct,
} from '../actions/conversations';
import { notifySagaError } from '@/helpers/notify';

const { createConversation, getConversations } = conversationsApiClient();

function* handleCreateConversation(action: PayloadAction<CreateConversation>) {
  try {
    const memberIds = action.payload;

    const response: AxiosResponse<GetConversationsResponse> = yield call(
      createConversation,
      memberIds
    );

    yield put(setConversations(response.data));
  } catch (error) {
    notifySagaError('Create conversation', error);
  }
}

function* handleGetConversations(action: PayloadAction<string>) {
  try {
    const userId = action.payload;

    const response: AxiosResponse<GetConversationsResponse> = yield call(
      getConversations,
      userId
    );

    yield put(setConversations(response.data));
  } catch (error) {
    notifySagaError('Get conversations', error);
  }
}

function* conversationSaga() {
  yield takeLatest(
    createConversationAct.request().type,
    handleCreateConversation
  );
  yield takeLatest(getConversationsAct.request().type, handleGetConversations);
}

export default conversationSaga;
