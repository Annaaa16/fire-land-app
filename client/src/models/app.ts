// types
import { Movie, Toast, User } from './common';
import { DialogDataState } from '@/components/Dialog';

export interface GlobalInitContext {
  isLargeMenu: boolean;
  showToast: (toast: Toast) => void;
  notifyMaintain: () => void;
  setLargeMenu: (isLarge: boolean) => void;
  setDialogData: (data: DialogDataState) => void;
}

export interface SocketInitContext {
  socketConversations: {
    joinConversation: (payload: { user: User; conversationId: string }) => void;
    leaveConversation: () => void;
    sendMessage: (text: string) => void;
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
