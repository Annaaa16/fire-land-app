import { createContext, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

// types
import { ReactNode } from 'react';
import { GetUserResponse } from '@/models/users';
import { GlobalInitContext } from '@/models/app';

import { LOCAL_STORAGE, PATHS } from '@/constants';
import { usersActions } from '@/redux/slices/usersSlice';
import useStoreDispatch from '@/hooks/useStoreDispatch';
import useLocalStorage from '@/hooks/useLocalStorage';
import cookies from '@/helpers/cookies';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect ';
import useSocket from '@/hooks/useSocket';

interface GlobalProviderProps {
  children: ReactNode;
  currentUserResponse?: GetUserResponse;
}

const initialState: GlobalInitContext = {
  theme: '',
  setTheme: () => {},
};

export const GlobalContext = createContext(initialState);

function GlobalProvider({
  children,
  currentUserResponse,
}: GlobalProviderProps) {
  const { storedValue: theme, setLocalValue: setTheme } = useLocalStorage(
    LOCAL_STORAGE.THEME_KEY,
    LOCAL_STORAGE.LIGHT_THEME_VALUE,
    useIsomorphicLayoutEffect
  );

  const { socketUsers } = useSocket();
  const dispatch = useStoreDispatch();
  const router = useRouter();

  // Set init user info
  useEffect(() => {
    if (currentUserResponse?.success) {
      dispatch(usersActions.setCurrentUser(currentUserResponse));
    }
  }, [currentUserResponse, dispatch]);

  // Add user to socket
  useEffect(() => {
    if (currentUserResponse?.success) {
      socketUsers.addOnlineUser(currentUserResponse.user);
      socketUsers.receiveOnlineUsers();
    }
  }, [currentUserResponse, socketUsers]);

  // Set previous path for handle redirect when logged in
  useEffect(() => {
    const { query, pathname } = router;

    if (query?.id && pathname.startsWith(PATHS.WALL)) {
      cookies.setPrevPath(PATHS.WALL + '/' + query.id);
    } else if (query?.id && pathname.startsWith(PATHS.MOVIES)) {
      cookies.setPrevPath(PATHS.MOVIES + '/' + query.id);
    } else if (pathname !== PATHS.LOGIN && pathname !== PATHS.REGISTER) {
      cookies.setPrevPath(pathname);
    }
  }, [router]);

  const value = { theme, setTheme };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalProvider;
