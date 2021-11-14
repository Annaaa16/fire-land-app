import { call, put, takeLatest } from '@redux-saga/core/effects';

// types
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { GetMessagesResponse, MessagePayload } from '@/models/messenger';

import { messengerActions } from '../slices/messengerSlice';
import { messagesApiClient } from '@/apis/messagesApi';
import { notifySagaError } from '@/helpers/notifyError';

const { createMessage, getMessages } = messagesApiClient();

function* handleCreateMessageRequest(action: PayloadAction<MessagePayload>) {
  try {
    yield call(createMessage, action.payload);

    yield put(messengerActions.createMessageSuccess());
  } catch (error) {
    notifySagaError(messengerActions.createMessageFailed, error);
    yield put(messengerActions.createMessageFailed());
  }
}

function* handleGetMessagesRequest(action: PayloadAction<string>) {
  const conversationId = action.payload;

  try {
    const response: AxiosResponse<GetMessagesResponse> = yield call(
      getMessages,
      conversationId
    );

    yield put(messengerActions.getMessagesSuccess(response.data));
  } catch (error) {
    notifySagaError(messengerActions.getMessagesFailed, error);
    yield put(messengerActions.getMessagesFailed());
  }
}

function* messageSaga() {
  yield takeLatest(
    messengerActions.createMessageRequest,
    handleCreateMessageRequest
  );
  yield takeLatest(
    messengerActions.getMessagesRequest,
    handleGetMessagesRequest
  );
}

export default messageSaga;
