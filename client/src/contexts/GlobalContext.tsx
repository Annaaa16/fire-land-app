import { createContext, useContext, useState, useEffect } from 'react';

// types
import { ReactNode } from 'react';

import { LOCAL_STORAGE } from '@/constants';
import { getCurrentUser } from '@/redux/actions/users';
import cookies from '@/helpers/cookies';
import token from '@/helpers/token';
import useStoreDispatch from '@/hooks/useStoreDispatch';
import useLocalStorage from '@/hooks/useLocalStorage';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

export interface GlobalInitContext {
  isShowSenderArea: boolean;
  toggleSenderArea: (isOpen: boolean) => void;
  theme: string;
  toggleTheme: (value: string) => void;
}

interface GlobalProviderProps {
  children: ReactNode;
  isAuthenticated: boolean;
  newToken: string;
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
  isAuthenticated,
  newToken,
}: GlobalProviderProps) {
  const useLayoutEffect = useIsomorphicLayoutEffect();

  const { storedValue: theme, setValue: toggleTheme } = useLocalStorage(
    LOCAL_STORAGE.THEME_KEY,
    LOCAL_STORAGE.LIGHT_THEME_VALUE,
    useLayoutEffect
  );

  const [isShowSenderArea, setIsShowSenderArea] = useState<boolean>(false);

  const dispatch = useStoreDispatch();

  const toggleSenderArea = (isOpen: boolean) => {
    setIsShowSenderArea(isOpen);
  };

  // Set new token for client
  if (newToken) {
    cookies.setAccessToken(newToken);
  }

  // Set current user
  useEffect(() => {
    const accessToken = cookies.getAccessToken();
    const { isExpired } = token.verifyToken(accessToken!)!;

    if (isAuthenticated && !isExpired) {
      dispatch(getCurrentUser.request());
    } else {
      cookies.removeAll();
    }
  }, [isAuthenticated, newToken, dispatch]);

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
