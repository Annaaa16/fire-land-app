import { createContext, useState, useEffect } from 'react';

// types
import { ReactNode } from 'react';
import { AxiosResponse } from 'axios';
import { GetUserResponse } from '@/models/auth';

import { usersApiClient } from '@/apis/usersApi';
import { setAuthStatus } from '@/redux/slices/authSlice';
import { setUser } from '@/redux/slices/usersSlice';
import cookies from '@/helpers/cookies';
import token from '@/helpers/token';
import useMyDispatch from '@/hooks/useMyDispatch';

export interface GlobalInitContext {
  isShowSenderArea: boolean;
  toggleSenderArea: (isOpen: boolean) => void;
}

interface GlobalProviderProps {
  children: ReactNode;
}

const initialState: GlobalInitContext = {
  isShowSenderArea: false,
  toggleSenderArea: () => {},
};

export const GlobalContext = createContext(initialState);

function GlobalProvider(props: GlobalProviderProps) {
  const { children } = props;

  const [isShowSenderArea, setIsShowSenderArea] = useState<boolean>(false);

  const dispatch = useMyDispatch();

  const toggleSenderArea = (isOpen: boolean) => {
    setIsShowSenderArea(isOpen);
  };

  // Set current user
  useEffect(() => {
    const accessToken = cookies.getAccessToken();
    const { isValid, isExpired } = token.verifyToken(accessToken!)!;

    if (isValid && !isExpired) {
      (async () => {
        const { getCurrentUser } = usersApiClient();

        const response =
          (await getCurrentUser()) as AxiosResponse<GetUserResponse>;

        dispatch(setAuthStatus(response.data));
        dispatch(setUser(response.data));
      })();
    } else {
      cookies.removeAll();
    }
  }, [dispatch]);

  const value = {
    isShowSenderArea,
    toggleSenderArea,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export default GlobalProvider;
