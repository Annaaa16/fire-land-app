import { createSlice } from '@reduxjs/toolkit';

// types
import { PayloadAction } from '@reduxjs/toolkit';
import { Message, MessengerInitState } from '@/models/messenger';

const initialState: MessengerInitState = {
  currentChat: [],
  conversationId: '',
  receiverId: '',
};

const messengerSlice = createSlice({
  name: 'messenger',
  initialState,
  reducers: {
    setCurrentChat: (state, action) => {
      const currentChat = action.payload;

      state.currentChat = currentChat;
    },

    addMessage: (state, action: PayloadAction<Message>) => {
      const message = action.payload;

      state.currentChat.push(message);
    },

    setConversationId: (state, action: PayloadAction<string>) => {
      const conversationId = action.payload;

      state.conversationId = conversationId;
    },

    setReceiverId: (state, action: PayloadAction<string>) => {
      const receiverId = action.payload;

      state.receiverId = receiverId;
    },
  },
});

export const { setCurrentChat, addMessage, setConversationId, setReceiverId } =
  messengerSlice.actions;

export default messengerSlice.reducer;
