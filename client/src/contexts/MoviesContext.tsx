import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

// types
import { Movie } from '@/models/common';
import { ReactNode } from 'react';
import { MoviesInitContext } from '@/models/app';

import useEventListener from '@/hooks/useEventListener';

interface MoviesProviderProps {
  children: ReactNode;
}

const initialState: MoviesInitContext = {
  targetEl: null,
  containerEl: null,
  preview: null,
  handleShowPreview: () => {},
  handleHidePreview: () => {},
  handleSetContainerEl: () => {},
  clearTimer: () => {},
};

export const MoviesContext = createContext(initialState);

function MoviesProvider({ children }: MoviesProviderProps) {
  const [targetEl, setTargetEl] = useState<HTMLElement | null>(null);
  const [containerEl, setContainerEl] = useState<HTMLElement | null>(null);
  const [preview, setPeview] = useState<Movie | null>(null);

  const timerRef = useRef<NodeJS.Timeout>();

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleShowPreview = useCallback(
    (targetEl: HTMLElement, movie: Movie) => {
      clearTimer();
      setTargetEl(null);
      setContainerEl(null);
      setPeview(movie);

      timerRef.current = setTimeout(() => {
        setTargetEl(targetEl);
      }, 500);
    },
    []
  );

  const handleHidePreview = useCallback(() => {
    clearTimer();
    setPeview(null);
    setTargetEl(null);
    setContainerEl(null);
  }, []);

  const handleSetContainerEl = useCallback(
    (containerEl: HTMLElement | null) => {
      setContainerEl(containerEl);
    },
    []
  );

  useEventListener('scroll', () => handleHidePreview());

  const value = {
    targetEl,
    containerEl,
    preview,
    handleShowPreview,
    handleHidePreview,
    handleSetContainerEl,
    clearTimer,
  };

  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
}

export const useMoviesContext = () => useContext(MoviesContext);

export default MoviesProvider;
