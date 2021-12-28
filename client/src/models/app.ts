// types
import {
  ConversationsEmitHandlers,
  NotificationEmitHandlers,
  UserEmitHandlers,
} from './socket';
import { Movie, Toast } from './common';

export interface GlobalInitContext {
  theme: string;
  setTheme: (value: string) => void;
  showToast: (toast: Toast) => void;
  notifyMaintain: () => void;
}

export interface SocketInitContext {
  socketConversations: ConversationsEmitHandlers;
  socketUsers: UserEmitHandlers;
  socketNotifications: NotificationEmitHandlers;
}

export interface MoviesInitContext {
  targetEl: HTMLElement | null;
  containerEl: HTMLElement | null;
  preview: Movie | null;
  handleShowPreview: (targetEl: HTMLElement, movie: Movie) => void;
  handleHidePreview: () => void;
  handleSetContainerEl: (containerEl: HTMLElement) => void;
  clearTimer: () => void;
}
