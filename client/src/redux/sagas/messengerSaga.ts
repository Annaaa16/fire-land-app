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
import { createMessage, getMessages } from '../actions/messenger';
import { addMessage, setCurrentChat } from '../slices/messengerSlice';

const { reqCreateMessage, reqGetMessages } = messageApiClient();

function* handleReqCreateMessage(action: PayloadAction<MessageData>) {
  const messageData = action.payload;

  try {
    const response: AxiosResponse<CreateMessageResponse> = yield call(
      reqCreateMessage,
      messageData
    );

    // yield put(addMessage(response.data.message));
  } catch (error) {
    console.log('Create message error 👉', error);
  }
}

function* handleReqGetMessages(action: PayloadAction<GetMessagesData>) {
  const { conversationId } = action.payload;

  try {
    const response: AxiosResponse<GetMessagesResponse> = yield call(
      reqGetMessages,
      conversationId
    );

    yield put(setCurrentChat(response.data.messages));
  } catch (error) {
    console.log('Get messages error 👉', error);
  }
}

function* messageSaga() {
  yield takeLatest(createMessage.request().type, handleReqCreateMessage);
  yield takeLatest(getMessages.request().type, handleReqGetMessages);
}

export default messageSaga;
