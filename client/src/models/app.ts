// types
import { Movie, Toast, User } from './common';

export interface GlobalInitContext {
  theme: string;
  isLargeMenu: boolean;
  setTheme: (value: string) => void;
  showToast: (toast: Toast) => void;
  notifyMaintain: () => void;
  handleSetIsLargeMenu: (isLarge: boolean) => void;
}

export interface SocketInitContext {
  socketConversations: {
    joinConversation: (payload: { user: User; conversationId: string }) => void;
    leaveConversation: () => void;
    sendMessage: (text: string) => void;
  };
  socketUsers: {
    addOnlineUser: (user: User) => void;
  };
  socketNotifications: {
    sendNotification: (content: string) => void;
  };
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
