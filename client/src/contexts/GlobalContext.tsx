import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

// types
import { ReactNode } from 'react';
import { GetUserResponse } from '@/models/users';
import { GlobalInitContext } from '@/models/app';
import { Toast as ToastType } from '@/models/common';
import { ToastHandler } from '@/components/Toast';
import { DialogDataState, DialogHandler } from '@/components/Dialog';

import { PATHS } from '@/constants';
import { userActions } from '@/redux/slices/usersSlice';
import { authActions } from '@/redux/slices/authSlice';
import { maintainNotification } from '@/utils/text';
import useStoreDispatch from '@/hooks/useStoreDispatch';
import cookies from '@/helpers/cookies';

import Dialog from '@/components/Dialog';
import Toast from '@/components/Toast';

interface GlobalProviderProps {
  children: ReactNode;
  getUserResponse?: GetUserResponse;
}

const initialState: GlobalInitContext = {
  isLargeMenu: false,
  showToast: () => {},
  notifyMaintain: () => {},
  setLargeMenu: () => {},
  setDialogData: () => {},
};

const GlobalContext = createContext(initialState);

function GlobalProvider({ children, getUserResponse }: GlobalProviderProps) {
  const [isLargeMenu, setIsLargeMenu] = useState<boolean>(false);

  const toastRef = useRef<ToastHandler>(null!);
  const dialogRef = useRef<DialogHandler>(null!);

  const dispatch = useStoreDispatch();
  const router = useRouter();

  const showToast = (toast: ToastType) => {
    toastRef.current.addToast(toast);
  };

  const notifyMaintain = () => {
    showToast({
      message: maintainNotification,
      status: 'maintain',
    });
  };

  const setLargeMenu = (isLarge: boolean) => setIsLargeMenu(isLarge);

  const setDialogData = (data: DialogDataState) => {
    dialogRef.current.setDialogData(data);
  };

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

  const value = {
    isLargeMenu,
    showToast,
    notifyMaintain,
    setLargeMenu,
    setDialogData,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
      <Toast ref={toastRef} />
      <Dialog ref={dialogRef} />
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalProvider;
