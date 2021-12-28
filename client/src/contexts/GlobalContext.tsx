import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { useRouter } from 'next/router';

// types
import { ReactNode } from 'react';
import { GetUserResponse } from '@/models/users';
import { GlobalInitContext } from '@/models/app';
import { Toast as ToastType } from '@/models/common';
import { ToastHandler } from '@/components/Toast';

import { LOCAL_STORAGE, NOTIFICATIONS, PATHS } from '@/constants';
import { userActions } from '@/redux/slices/usersSlice';
import { authActions } from '@/redux/slices/authSlice';
import useStoreDispatch from '@/hooks/useStoreDispatch';
import useLocalStorage from '@/hooks/useLocalStorage';
import cookies from '@/helpers/cookies';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect ';

import Toast from '@/components/Toast';

interface GlobalProviderProps {
  children: ReactNode;
  getUserResponse?: GetUserResponse;
}

const initialState: GlobalInitContext = {
  theme: '',
  setTheme: () => {},
  showToast: () => {},
  notifyMaintain: () => {},
};

const GlobalContext = createContext(initialState);

function GlobalProvider({ children, getUserResponse }: GlobalProviderProps) {
  const toastRef = useRef<ToastHandler>(null!);

  const { storedValue: theme, setLocalValue: setTheme } = useLocalStorage(
    LOCAL_STORAGE.THEME_KEY,
    LOCAL_STORAGE.LIGHT_THEME_VALUE,
    useIsomorphicLayoutEffect
  );

  const dispatch = useStoreDispatch();
  const router = useRouter();

  const showToast = useCallback(
    (toast: ToastType) => toastRef.current.addToast(toast),
    []
  );

  const notifyMaintain = () =>
    showToast({
      message: NOTIFICATIONS.MAINTAIN,
      status: 'maintain',
    });

  // Set init user
  useEffect(() => {
    if (!getUserResponse?.success) return;

    dispatch(userActions.setCurrentUser(getUserResponse));
    dispatch(authActions.setIsAuthenticated(true));
  }, [getUserResponse, dispatch]);

  // Set previous path for handle redirect when logged in
  useEffect(() => {
    const { query, pathname } = router;

    if (query?.id && pathname.startsWith(PATHS.WALL)) {
      return cookies.setPrevPath(PATHS.WALL + '/' + query.id);
    }

    if (query?.id && pathname.startsWith(PATHS.MOVIES)) {
      return cookies.setPrevPath(PATHS.MOVIES + '/' + query.id);
    }

    if (pathname !== PATHS.LOGIN && pathname !== PATHS.REGISTER) {
      cookies.setPrevPath(pathname);
    }
  }, [router]);

  const value = { theme, setTheme, showToast, notifyMaintain };

  return (
    <GlobalContext.Provider value={value}>
      {children}
      <Toast ref={toastRef} />
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalProvider;
