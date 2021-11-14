import { createSlice } from '@reduxjs/toolkit';

// lodash
import _ from 'lodash';

// types
import {
  ConversationsInitState,
  CreateConversationPayload,
  CreateConversationResponse,
  DeleteConversationResponse,
  GetConversationsResponse,
} from '@/models/conversations';
import { PayloadAction } from '@reduxjs/toolkit';

import { addLoading, removeLoading } from '@/helpers/loadings';

const loadings = {
  createConversation: 'createConversation',
  getConversations: 'getConversations',
  deleteConversation: 'deleteConversation',
};

const initialState: ConversationsInitState = {
  conversations: [],
  loadings: [],
};

const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    createConversationRequest: (
      state,
      action: PayloadAction<CreateConversationPayload>
    ) => {
      addLoading(state, loadings.createConversation);
    },
    createConversationSuccess: (
      state,
      action: PayloadAction<CreateConversationResponse>
    ) => {
      const { success, conversation } = action.payload;

      if (success) {
        state.conversations.push(conversation);

        removeLoading(state, loadings.createConversation);
      }
    },
    createConversationFailed: (state) => {
      removeLoading(state, loadings.createConversation);
    },

    getConversationsRequest: (state, action: PayloadAction<string>) => {
      addLoading(state, loadings.getConversations);
    },
    getConversationsSuccess: (
      state,
      action: PayloadAction<GetConversationsResponse>
    ) => {
      const { success, conversations } = action.payload;

      if (success) {
        state.conversations = conversations;

        removeLoading(state, loadings.getConversations);
      }
    },
    getConversationsFailed: (state) => {
      removeLoading(state, loadings.getConversations);
    },

    deleteConversationRequest: (state, action: PayloadAction<string>) => {
      addLoading(state, loadings.deleteConversation);
    },
    deleteConversationSuccess: (
      state,
      action: PayloadAction<DeleteConversationResponse>
    ) => {
      const { success, conversationId } = action.payload;

      if (success) {
        _.remove(state.conversations, (n) => n._id === conversationId);

        removeLoading(state, loadings.deleteConversation);
      }
    },
    deleteConversationFailed: (state) => {
      removeLoading(state, loadings.deleteConversation);
    },
  },
});

export { loadings };

export const conversationsActions = conversationsSlice.actions;

export default conversationsSlice.reducer;
