import { createSlice } from '@reduxjs/toolkit';

// types
import { PayloadAction } from '@reduxjs/toolkit';
import {
  ConversationsInitState,
  GetConversationsResponse,
} from '@/models/conversations';

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

      if (success) state.conversations = conversations;
    },
  },
});

export const { setConversations } = conversationSlice.actions;

export default conversationSlice.reducer;
