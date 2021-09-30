export interface GetPosts {
  page: number;
  limit: number;
}

export interface UpdatePost {
  id: string;
  updateData: FormData;
}

export const createPost = {
  request: (payload?: FormData) => ({
    type: 'createPost/request',
    payload,
  }),
  success: () => ({
    type: 'createPost/success',
  }),
  failure: () => ({
    type: 'createPost/failure',
  }),
};

export const getPosts = {
  request: (payload?: GetPosts) => ({
    type: 'getPosts/request',
    payload,
  }),
  success: () => ({
    type: 'getPosts/success',
  }),
  failure: () => ({
    type: 'getPosts/failure',
  }),
};

export const updatePost = {
  request: (payload?: UpdatePost) => ({
    type: 'updatePost/request',
    payload,
  }),
  success: () => ({
    type: 'updatePost/success',
  }),
  failure: () => ({
    type: 'updatePost/failure',
  }),
};

export const deletePost = {
  request: (payload?: string) => ({
    type: 'deletePost/request',
    payload,
  }),
  success: () => ({
    type: 'deletePost/success',
  }),
  failure: () => ({
    type: 'deletePost/failure',
  }),
};
