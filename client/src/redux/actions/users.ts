export const followUser = {
  request: (payload?: string) => ({
    type: 'followUser/request',
    payload,
  }),
  success: () => ({
    type: 'followUser/success',
  }),
  failure: () => ({
    type: 'followUser/failure',
  }),
};

export const unfollowUser = {
  request: (payload?: string) => ({
    type: 'unfollowUser/request',
    payload,
  }),
  success: () => ({
    type: 'unfollowUser/success',
  }),
  failure: () => ({
    type: 'unfollowUser/failure',
  }),
};
