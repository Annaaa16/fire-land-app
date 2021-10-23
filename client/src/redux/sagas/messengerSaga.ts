import { call, put, takeLatest } from '@redux-saga/core/effects';

// types
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import {
  GetMessagesData,
  GetMessagesResponse,
  MessageData,
} from '@/models/messenger';

import { messagesApiClient } from '@/apis/messagesApi';
import {
  createMessage as createMessageAct,
  getMessages as getMessagesAct,
} from '../actions/messenger';
import { setCurrentChat } from '../slices/messengerSlice';
import { notifySagaError } from '@/helpers/notify';

const { createMessage, getMessages } = messagesApiClient();

function* handleCreateMessage(action: PayloadAction<MessageData>) {
  const messageData = action.payload;

  try {
    yield call(createMessage, messageData);
  } catch (error) {
    notifySagaError('Create message', error);
  }
}

function* handleGetMessages(action: PayloadAction<GetMessagesData>) {
  const { conversationId } = action.payload;

  try {
    const response: AxiosResponse<GetMessagesResponse> = yield call(
      getMessages,
      conversationId
    );

    yield put(setCurrentChat(response.data));
  } catch (error) {
    notifySagaError('Get messages', error);
  }
}

function* messageSaga() {
  yield takeLatest(createMessageAct.request().type, handleCreateMessage);
  yield takeLatest(getMessagesAct.request().type, handleGetMessages);
}

export default messageSaga;
