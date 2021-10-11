// types
import { GetMessagesData, MessageData } from '@/models/messenger';

export const createMessage = {
  request: (payload?: MessageData) => ({
    type: 'createMessage/request',
    payload,
  }),
  success: () => ({
    type: 'createMessage/success',
  }),
  failure: () => ({
    type: 'createMessage/failure',
  }),
};

export const getMessages = {
  request: (payload?: GetMessagesData) => ({
    type: 'getMessages/request',
    payload,
  }),
  success: () => ({
    type: 'getMessages/success',
  }),
  failure: () => ({
    type: 'getMessages/failure',
  }),
};
