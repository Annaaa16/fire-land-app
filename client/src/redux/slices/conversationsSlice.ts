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

const actions = {
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
      addLoading(state, actions.createConversation);
    },
    createConversationSuccess: (
      state,
      action: PayloadAction<CreateConversationResponse>
    ) => {
      const { success, conversation } = action.payload;

      if (success) {
        state.conversations.push(conversation);

        removeLoading(state, actions.createConversation);
      }
    },
    createConversationFailed: (state) => {
      removeLoading(state, actions.createConversation);
    },

    getConversationsRequest: (state, action: PayloadAction<string>) => {
      addLoading(state, actions.getConversations);
    },
    getConversationsSuccess: (
      state,
      action: PayloadAction<GetConversationsResponse>
    ) => {
      const { success, conversations } = action.payload;

      if (success) {
        state.conversations = conversations;

        removeLoading(state, actions.getConversations);
      }
    },
    getConversationsFailed: (state) => {
      removeLoading(state, actions.getConversations);
    },

    deleteConversationRequest: (state, action: PayloadAction<string>) => {
      addLoading(state, actions.deleteConversation);
    },
    deleteConversationSuccess: (
      state,
      action: PayloadAction<DeleteConversationResponse>
    ) => {
      const { success, conversationId } = action.payload;

      if (success) {
        _.remove(state.conversations, (n) => n._id === conversationId);

        removeLoading(state, actions.deleteConversation);
      }
    },
    deleteConversationFailed: (state) => {
      removeLoading(state, actions.deleteConversation);
    },
  },
});

export { actions };

export const conversationsActions = conversationsSlice.actions;

export default conversationsSlice.reducer;
