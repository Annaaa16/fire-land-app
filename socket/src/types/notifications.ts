// types
import { User } from './common';

export interface Notification {
  readonly id: string;
  user: User;
  content: string;
  createdAt: string;
}
