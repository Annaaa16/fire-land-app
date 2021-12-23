import { call, delay, put, takeLatest } from '@redux-saga/core/effects';

// types
import {
  CreateConversationPayload,
  CreateConversationResponse,
  DeleteConversationPayload,
  DeleteConversationResponse,
  GetConversationsPayload,
  GetConversationsResponse,
} from '@/models/conversations';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { DELAYS } from '@/constants';
import { conversationActions } from '../slices/conversationsSlice';
import { conversationsApiClient } from '@/apis/conversationsApi';
import { notifySagaError } from '@/helpers/notifyError';

const { createConversation, getConversations, deleteConversation } =
  conversationsApiClient();

function* handleCreateConversationRequest(
  action: PayloadAction<CreateConversationPayload>
) {
  try {
    yield delay(DELAYS.DEFAULT); // Block spam add friend button

    const response: AxiosResponse<CreateConversationResponse> = yield call(
      createConversation,
      action.payload
    );

    yield put(conversationActions.createConversationSuccess(response.data));
  } catch (error) {
    notifySagaError(conversationActions.createConversationFailed, error);
    yield put(conversationActions.createConversationFailed());
  }
}

function* handleGetConversationsRequest(
  action: PayloadAction<GetConversationsPayload>
) {
  try {
    const response: AxiosResponse<GetConversationsResponse> = yield call(
      getConversations,
      action.payload
    );

    yield put(conversationActions.getConversationsSuccess(response.data));
  } catch (error) {
    notifySagaError(conversationActions.getConversationsFailed, error);
    yield put(conversationActions.getConversationsFailed());
  }
}

function* handleDeleteConversationRequest(
  action: PayloadAction<DeleteConversationPayload>
) {
  try {
    const response: AxiosResponse<DeleteConversationResponse> = yield call(
      deleteConversation,
      action.payload
    );

    yield put(conversationActions.deleteConversationSuccess(response.data));
  } catch (error) {
    notifySagaError(conversationActions.deleteConversationFailed, error);
    yield put(conversationActions.deleteConversationFailed());
  }
}

function* conversationSaga() {
  yield takeLatest(
    conversationActions.createConversationRequest,
    handleCreateConversationRequest
  );
  yield takeLatest(
    conversationActions.getConversationsRequest,
    handleGetConversationsRequest
  );
  yield takeLatest(
    conversationActions.deleteConversationRequest,
    handleDeleteConversationRequest
  );
}

export default conversationSaga;
