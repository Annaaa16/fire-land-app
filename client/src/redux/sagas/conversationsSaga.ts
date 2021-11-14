import { call, delay, put, takeLatest } from '@redux-saga/core/effects';

// types
import {
  CreateConversationPayload,
  CreateConversationResponse,
  DeleteConversationResponse,
  GetConversationsResponse,
} from '@/models/conversations';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { DELAYS } from '@/constants';
import { conversationsActions } from '../slices/conversationsSlice';
import { conversationsApiClient } from '@/apis/conversationsApi';
import { notifySagaError } from '@/helpers/notifyError';

const { createConversation, getConversations, deleteConversation } =
  conversationsApiClient();

function* handleCreateConversationRequest(
  action: PayloadAction<CreateConversationPayload>
) {
  try {
    yield delay(DELAYS.DEFAULT); // Block spam add friend button

    const memberIds = action.payload;

    const response: AxiosResponse<CreateConversationResponse> = yield call(
      createConversation,
      memberIds
    );

    yield put(conversationsActions.createConversationSuccess(response.data));
  } catch (error) {
    notifySagaError(conversationsActions.createConversationFailed, error);
    yield put(conversationsActions.createConversationFailed());
  }
}

function* handleGetConversationsRequest(action: PayloadAction<string>) {
  try {
    const deleteConversation = action.payload;

    const response: AxiosResponse<GetConversationsResponse> = yield call(
      getConversations,
      deleteConversation
    );

    yield put(conversationsActions.getConversationsSuccess(response.data));
  } catch (error) {
    notifySagaError(conversationsActions.getConversationsFailed, error);
    yield put(conversationsActions.getConversationsFailed());
  }
}

function* handleDeleteConversationRequest(action: PayloadAction<string>) {
  try {
    const conversationId = action.payload;

    const response: AxiosResponse<DeleteConversationResponse> = yield call(
      deleteConversation,
      conversationId
    );

    yield put(conversationsActions.deleteConversationSuccess(response.data));
  } catch (error) {
    notifySagaError(conversationsActions.deleteConversationFailed, error);
    yield put(conversationsActions.deleteConversationFailed());
  }
}

function* conversationSaga() {
  yield takeLatest(
    conversationsActions.createConversationRequest,
    handleCreateConversationRequest
  );
  yield takeLatest(
    conversationsActions.getConversationsRequest,
    handleGetConversationsRequest
  );
  yield takeLatest(
    conversationsActions.deleteConversationRequest,
    handleDeleteConversationRequest
  );
}

export default conversationSaga;
