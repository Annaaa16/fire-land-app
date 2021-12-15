import { call, put, takeLatest } from '@redux-saga/core/effects';

// types
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import {
  GetMessagesResponse,
  CreateMessagePayload,
  GetMessagesPayload,
} from '@/models/messenger';

import { messengerActions } from '../slices/messengerSlice';
import { messagesApiClient } from '@/apis/messagesApi';
import { notifySagaError } from '@/helpers/notifyError';

const { createMessage, getMessages } = messagesApiClient();

function* handleCreateMessageRequest(
  action: PayloadAction<CreateMessagePayload>
) {
  try {
    yield call(createMessage, action.payload);

    yield put(messengerActions.createMessageSuccess());
  } catch (error) {
    notifySagaError(messengerActions.createMessageFailed, error);
    yield put(messengerActions.createMessageFailed());
  }
}

function* handleGetMessagesRequest(action: PayloadAction<GetMessagesPayload>) {
  try {
    const response: AxiosResponse<GetMessagesResponse> = yield call(
      getMessages,
      action.payload
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
