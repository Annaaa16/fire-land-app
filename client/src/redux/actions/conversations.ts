// types
import { CreateConversation } from '@/models/conversations';

export const createConversation = {
  request: (payload?: CreateConversation) => ({
    type: 'createConversation/request',
    payload,
  }),
  success: () => ({
    type: 'createConversation/success',
  }),
  failure: () => ({
    type: 'createConversation/failure',
  }),
};

export const getConversations = {
  request: (payload?: string) => ({
    type: 'getConversations/request',
    payload,
  }),
  success: () => ({
    type: 'getConversations/success',
  }),
  failure: () => ({
    type: 'getConversations/failure',
  }),
};
