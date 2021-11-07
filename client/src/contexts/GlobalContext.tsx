import {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
  useEffect,
} from 'react';

// types
import { ReactNode } from 'react';
import { GetUserResponse } from '@/models/users';

import { LOCAL_STORAGE } from '@/constants';
import { setUser } from '@/redux/slices/usersSlice';
import useStoreDispatch from '@/hooks/useStoreDispatch';
import useLocalStorage from '@/hooks/useLocalStorage';

export interface GlobalInitContext {
  isShowSenderArea: boolean;
  toggleSenderArea: (isOpen: boolean) => void;
  theme: string;
  toggleTheme: (value: string) => void;
}

interface GlobalProviderProps {
  children: ReactNode;
  currentUserResponse?: GetUserResponse;
}

const initialState: GlobalInitContext = {
  isShowSenderArea: false,
  toggleSenderArea: () => {},
  theme: '',
  toggleTheme: () => {},
};

export const GlobalContext = createContext(initialState);

function GlobalProvider({
  children,
  currentUserResponse,
}: GlobalProviderProps) {
  const { storedValue: theme, setValue: toggleTheme } = useLocalStorage(
    LOCAL_STORAGE.THEME_KEY,
    LOCAL_STORAGE.LIGHT_THEME_VALUE,
    typeof window !== 'undefined' ? useLayoutEffect : useEffect
  );

  const [isShowSenderArea, setIsShowSenderArea] = useState<boolean>(false);

  const dispatch = useStoreDispatch();

  const toggleSenderArea = (isOpen: boolean) => {
    setIsShowSenderArea(isOpen);
  };

  // Set current user for every page re-load
  useEffect(() => {
    if (currentUserResponse?.success) {
      dispatch(setUser(currentUserResponse));
    }
  }, [currentUserResponse, dispatch]);

  const value = {
    isShowSenderArea,
    toggleSenderArea,
    theme,
    toggleTheme,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalProvider;
