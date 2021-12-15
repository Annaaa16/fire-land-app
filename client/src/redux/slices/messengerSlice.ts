import { createSlice } from '@reduxjs/toolkit';

// types
import {
  GetMessagesResponse,
  Message,
  CreateMessagePayload,
  MessengerInitState,
  GetMessagesPayload,
} from '@/models/messenger';
import { PayloadAction } from '@reduxjs/toolkit';
import { addLoading, removeLoading } from '@/helpers/reduxStateLoadings';

export const actions = {
  createMessage: 'createMessage',
  getMessages: 'getMessages',
};

const initialState: MessengerInitState = {
  messages: [],
  conversationId: '',
  receiverId: '',
  loadings: [],
};

const messengerSlice = createSlice({
  name: 'messenger',
  initialState,
  reducers: {
    createMessageRequest: (
      state,
      action: PayloadAction<CreateMessagePayload>
    ) => {
      addLoading(state, actions.createMessage);
    },
    createMessageSuccess: (state) => {
      removeLoading(state, actions.createMessage);
    },
    createMessageFailed: (state) => {
      removeLoading(state, actions.createMessage);
    },

    getMessagesRequest: (state, action: PayloadAction<GetMessagesPayload>) => {
      addLoading(state, actions.getMessages);
    },
    getMessagesSuccess: (state, action: PayloadAction<GetMessagesResponse>) => {
      const { success, messages } = action.payload;

      if (success) {
        state.messages = messages;

        removeLoading(state, actions.getMessages);
      }
    },
    getMessagesFailed: (state) => {
      removeLoading(state, actions.getMessages);
    },

    addMessage: (state, action: PayloadAction<Message>) => {
      const message = action.payload;

      state.messages.push(message);
    },

    setConversationId: (state, action: PayloadAction<string>) => {
      state.conversationId = action.payload;
    },

    setReceiverId: (state, action: PayloadAction<string>) => {
      state.receiverId = action.payload;
    },
  },
});

export const messengerActions = messengerSlice.actions;

export default messengerSlice.reducer;
