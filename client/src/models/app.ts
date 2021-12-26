// types
import { Movie, Toast } from './common';

export interface GlobalInitContext {
  theme: string;
  setTheme: (value: string) => void;
  showToast: (toast: Toast) => void;
  notifyMaintain: () => void;
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
