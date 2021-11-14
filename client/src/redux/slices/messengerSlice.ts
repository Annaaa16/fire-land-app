import { createSlice } from '@reduxjs/toolkit';

// types
import {
  GetMessagesResponse,
  Message,
  MessagePayload,
  MessengerInitState,
} from '@/models/messenger';
import { PayloadAction } from '@reduxjs/toolkit';
import { addLoading, removeLoading } from '@/helpers/loadings';

const loadings = {
  createMessage: 'createMessage',
  getMessages: 'getMessages',
};

const initialState: MessengerInitState = {
  messageContent: [],
  conversationId: '',
  receiverId: '',
  loadings: [],
};

const messengerSlice = createSlice({
  name: 'messenger',
  initialState,
  reducers: {
    createMessageRequest: (state, action: PayloadAction<MessagePayload>) => {
      addLoading(state, loadings.createMessage);
    },
    createMessageSuccess: (state) => {
      removeLoading(state, loadings.createMessage);
    },
    createMessageFailed: (state) => {
      removeLoading(state, loadings.createMessage);
    },

    getMessagesRequest: (state, action: PayloadAction<string>) => {
      addLoading(state, loadings.getMessages);
    },
    getMessagesSuccess: (state, action: PayloadAction<GetMessagesResponse>) => {
      const { success, messages } = action.payload;

      if (success) {
        state.messageContent = messages;

        removeLoading(state, loadings.getMessages);
      }
    },
    getMessagesFailed: (state) => {
      removeLoading(state, loadings.getMessages);
    },

    addMessage: (state, action: PayloadAction<Message>) => {
      const message = action.payload;

      state.messageContent.push(message);
    },

    setConversationId: (state, action: PayloadAction<string>) => {
      state.conversationId = action.payload;
    },

    setReceiverId: (state, action: PayloadAction<string>) => {
      state.receiverId = action.payload;
    },
  },
});

export { loadings };

export const messengerActions = messengerSlice.actions;

export default messengerSlice.reducer;
