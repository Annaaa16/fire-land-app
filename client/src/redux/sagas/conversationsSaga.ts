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

import { DELAYS } from '@/constants';
import { conversationActions } from '../slices/conversationsSlice';
import { conversationsApiClient } from '@/apis/conversationsApi';

const { createConversation, getConversations, deleteConversation } =
  conversationsApiClient();

function* handleCreateConversationRequest(
  action: PayloadAction<CreateConversationPayload>
) {
  try {
    yield delay(DELAYS.DEFAULT); // Block spam add friend button

    const response: CreateConversationResponse = yield call(
      createConversation,
      action.payload
    );

    yield put(conversationActions.createConversationSuccess(response));
  } catch (error) {
    yield put(conversationActions.createConversationFailed());
  }
}

function* handleGetConversationsRequest(
  action: PayloadAction<GetConversationsPayload>
) {
  try {
    const response: GetConversationsResponse = yield call(
      getConversations,
      action.payload
    );

    yield put(conversationActions.getConversationsSuccess(response));
  } catch (error) {
    yield put(conversationActions.getConversationsFailed());
  }
}

function* handleDeleteConversationRequest(
  action: PayloadAction<DeleteConversationPayload>
) {
  try {
    const response: DeleteConversationResponse = yield call(
      deleteConversation,
      action.payload
    );

    yield put(conversationActions.deleteConversationSuccess(response));
  } catch (error) {
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
