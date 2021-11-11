import { createSlice } from '@reduxjs/toolkit';

// lodash
import _ from 'lodash';

// types
import {
  ConversationsInitState,
  CreateConversationResponse,
  GetConversationsResponse,
} from '@/models/conversations';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: ConversationsInitState = {
  conversations: [],
};

const conversationSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    setConversations: (
      state,
      action: PayloadAction<GetConversationsResponse>
    ) => {
      const { success, conversations } = action.payload;

      if (success) {
        state.conversations = conversations;
      }
    },

    addConversation: (
      state,
      action: PayloadAction<CreateConversationResponse>
    ) => {
      const { success, conversation } = action.payload;

      if (success) {
        state.conversations.push(conversation);
      }
    },

    clearDeletedConversation: (state, action: PayloadAction<string>) => {
      const conversationId = action.payload;

      _.remove(state.conversations, (n) => n._id === conversationId);
    },
  },
});

export const { setConversations, addConversation, clearDeletedConversation } =
  conversationSlice.actions;

export default conversationSlice.reducer;
