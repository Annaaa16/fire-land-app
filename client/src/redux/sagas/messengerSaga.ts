import { call, put, takeLatest } from '@redux-saga/core/effects';

// types
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import {
  GetMessagesData,
  GetMessagesResponse,
  MessageData,
} from '@/models/messenger';
import { CreateMessageResponse } from '@/models/messenger';

import { messageApiClient } from '@/apis/messageApi';
import {
  createMessage as createMessageAct,
  getMessages as getMessagesAct,
} from '../actions/messenger';
import { addMessage, setCurrentChat } from '../slices/messengerSlice';

const { createMessage, getMessages } = messageApiClient();

function* handleCreateMessage(action: PayloadAction<MessageData>) {
  const messageData = action.payload;

  try {
    const response: AxiosResponse<CreateMessageResponse> = yield call(
      createMessage,
      messageData
    );

    // yield put(addMessage(response.data.message));
  } catch (error) {
    console.log('Create message error 👉', error);
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
    console.log('Get messages error 👉', error);
  }
}

function* messageSaga() {
  yield takeLatest(createMessageAct.request().type, handleCreateMessage);
  yield takeLatest(getMessagesAct.request().type, handleGetMessages);
}

export default messageSaga;
