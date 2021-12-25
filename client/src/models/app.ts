// types
import { Movie } from './common';

export interface GlobalInitContext {
  theme: string;
  setTheme: (value: string) => void;
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
