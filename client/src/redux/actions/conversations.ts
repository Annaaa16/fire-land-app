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
