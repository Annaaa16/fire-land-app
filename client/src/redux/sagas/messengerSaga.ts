import { call, put, takeLatest } from '@redux-saga/core/effects';

// types
import {
  GetMessagesResponse,
  CreateMessagePayload,
  GetMessagesPayload,
} from '@/models/messenger';
import { PayloadAction } from '@reduxjs/toolkit';

import { messengerActions } from '../slices/messengerSlice';
import { messagesApiClient } from '@/apis/messagesApi';

const { createMessage, getMessages } = messagesApiClient();

function* handleCreateMessageRequest(
  action: PayloadAction<CreateMessagePayload>
) {
  try {
    yield call(createMessage, action.payload);

    yield put(messengerActions.createMessageSuccess());
  } catch (error) {
    yield put(messengerActions.createMessageFailed());
  }
}

function* handleGetMessagesRequest(action: PayloadAction<GetMessagesPayload>) {
  try {
    const response: GetMessagesResponse = yield call(
      getMessages,
      action.payload
    );

    yield put(messengerActions.getMessagesSuccess(response));
  } catch (error) {
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
