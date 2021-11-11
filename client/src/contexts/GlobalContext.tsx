import {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
  useEffect,
} from 'react';
import { useRouter } from 'next/router';

// types
import { ReactNode } from 'react';
import { GetUserResponse } from '@/models/users';

import { LOCAL_STORAGE, PATHS } from '@/constants';
import { setUser } from '@/redux/slices/usersSlice';
import useStoreDispatch from '@/hooks/useStoreDispatch';
import useLocalStorage from '@/hooks/useLocalStorage';
import cookies from '@/helpers/cookies';

export interface GlobalInitContext {
  isShowSenderArea: boolean;
  toggleSenderArea: (isOpen: boolean) => void;
  theme: string;
  toggleTheme: (value: string) => void;
  visitWall: (userId: string) => void;
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
  visitWall: () => {},
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
  const router = useRouter();

  const toggleSenderArea = (isOpen: boolean) => {
    setIsShowSenderArea(isOpen);
  };

  const visitWall = (userId: string) => {
    router.push({ pathname: PATHS.WALL + '/[id]', query: { id: userId } });
  };

  // Set current user for every page re-load
  useEffect(() => {
    if (currentUserResponse?.success) {
      dispatch(setUser(currentUserResponse));
    }
  }, [currentUserResponse, dispatch]);

  // Set previous path for invalid redirect to login or register when logged in
  useEffect(() => {
    const { query, pathname } = router;

    if (query?.id) {
      cookies.setPrevPath(PATHS.WALL + '/' + query.id);
    } else if (pathname !== PATHS.LOGIN && pathname !== PATHS.REGISTER) {
      cookies.setPrevPath(pathname);
    }
  }, [router]);

  const value = {
    isShowSenderArea,
    toggleSenderArea,
    theme,
    toggleTheme,
    visitWall,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalProvider;
