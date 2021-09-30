export interface User {
  readonly _id: string;
  username: string;
  avatar: string;
}

export interface Post {
  id: string;
  user: User;
  content: string;
  likeCount: number;
  photo: string;
  photoId: string;
  createdAt: string;
}
