import { call, delay, put, takeLatest } from '@redux-saga/core/effects';

// types
import {
  CreateConversation,
  CreateConversationResponse,
  GetConversationsResponse,
} from '@/models/conversations';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import {
  createConversation as createConversationAct,
  getConversations as getConversationsAct,
  deleteConversation as deleteConversationAct,
} from '../actions/conversations';
import {
  addConversation,
  clearDeletedConversation,
  setConversations,
} from '../slices/conversationsSlice';
import { DELAYS } from '@/constants';
import { conversationsApiClient } from '@/apis/conversationsApi';
import { notifySagaError } from '@/helpers/notify';

const { createConversation, getConversations, deleteConversation } =
  conversationsApiClient();

function* handleCreateConversation(action: PayloadAction<CreateConversation>) {
  try {
    yield delay(DELAYS.DEFAULT); // Block spam add friend button

    const memberIds = action.payload;

    const response: AxiosResponse<CreateConversationResponse> = yield call(
      createConversation,
      memberIds
    );

    yield put(addConversation(response.data));
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

function* handleDeleteConversations(action: PayloadAction<string>) {
  const conversationId = action.payload;

  try {
    yield delay(DELAYS.DEFAULT); // Block spam add unfriend button

    yield put(clearDeletedConversation(conversationId));

    yield call(deleteConversation, conversationId);
  } catch (error) {
    notifySagaError('Delete conversation', error);
  }
}

function* conversationSaga() {
  yield takeLatest(
    createConversationAct.request().type,
    handleCreateConversation
  );
  yield takeLatest(getConversationsAct.request().type, handleGetConversations);
  yield takeLatest(
    deleteConversationAct.request().type,
    handleDeleteConversations
  );
}

export default conversationSaga;
