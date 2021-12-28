export interface User {
  readonly _id: string;
  readonly conversationId: string;
  readonly socketId: string;
  username: string;
  avatar: string;
  friends: string[];
  followings: string[];
  followers: string[];
  createdAt: string;
  updatedAt: string;
}
