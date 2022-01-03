// types
import {
  CreateMessageResponse,
  GetMessagesResponse,
  CreateMessagePayload,
  GetMessagesPayload,
} from '@/models/messenger';

import { axiosClient } from './axiosClient';

export const messagesApiClient = () => {
  const axiosInstance = axiosClient();

  return {
    createMessage(
      messageData: CreateMessagePayload
    ): Promise<CreateMessageResponse> {
      return axiosInstance.post('/messages', messageData);
    },

    getMessages({
      conversationId,
    }: GetMessagesPayload): Promise<GetMessagesResponse> {
      return axiosInstance.get('/messages/' + conversationId);
    },
  };
};
