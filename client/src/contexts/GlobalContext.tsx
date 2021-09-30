import { createContext, ReactNode, useState } from 'react';

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

  const toggleSenderArea = (isOpen: boolean) => {
    setIsShowSenderArea(isOpen);
  };

  const value = {
    isShowSenderArea,
    toggleSenderArea,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export default GlobalProvider;
