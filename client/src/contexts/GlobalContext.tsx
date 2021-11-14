import {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
  useEffect,
} from 'react';
import { useRouter } from 'next/router';

// lodash
import _ from 'lodash';

// types
import { ReactNode } from 'react';
import { GetUserResponse } from '@/models/users';
import { GlobalInitContext } from '@/models/global';

import { LOCAL_STORAGE, PATHS } from '@/constants';
import { conversationsActions } from '@/redux/slices/conversationsSlice';
import { usersActions } from '@/redux/slices/usersSlice';
import { useConversationsSelector, useUsersSelector } from '@/redux/selectors';
import useStoreDispatch from '@/hooks/useStoreDispatch';
import useLocalStorage from '@/hooks/useLocalStorage';
import cookies from '@/helpers/cookies';

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
  handleMakeFriend: () => {},
};

const GlobalContext = createContext(initialState);

function GlobalProvider({
  children,
  currentUserResponse,
}: GlobalProviderProps) {
  const { storedValue: theme, setValue: toggleTheme } = useLocalStorage(
    LOCAL_STORAGE.THEME_KEY,
    LOCAL_STORAGE.LIGHT_THEME_VALUE,
    typeof window !== 'undefined' ? useLayoutEffect : useEffect
  );

  const { conversations } = useConversationsSelector();
  const { currentUser } = useUsersSelector();

  const [isShowSenderArea, setIsShowSenderArea] = useState<boolean>(false);

  const dispatch = useStoreDispatch();
  const router = useRouter();

  const toggleSenderArea = (isOpen: boolean) => {
    setIsShowSenderArea(isOpen);
  };

  const visitWall = (userId: string) => {
    router.push({ pathname: PATHS.WALL + '/[id]', query: { id: userId } });
  };

  const handleMakeFriend = (followedUserId: string) => {
    const { _id, followings } = currentUser;

    if (!_id || !followedUserId) return;

    const addFriend = () => {
      dispatch(
        conversationsActions.createConversationRequest({
          senderId: _id as string,
          receiverId: followedUserId,
        })
      );

      dispatch(usersActions.followUserRequest(followedUserId));
    };

    const unfriend = async () => {
      const conversation = conversations.find(
        ({ memberIds }) =>
          memberIds.includes(_id) && memberIds.includes(followedUserId)
      );

      dispatch(usersActions.unfollowUserRequest(followedUserId));
      dispatch(
        conversationsActions.deleteConversationRequest(conversation!._id)
      );
    };

    followings.includes(followedUserId) ? unfriend() : addFriend();
  };

  // Set init user info
  useEffect(() => {
    if (currentUserResponse?.success) {
      dispatch(usersActions.setCurrentUser(currentUserResponse));
      dispatch(
        conversationsActions.getConversationsRequest(
          currentUserResponse.user._id
        )
      );
    }
  }, [currentUserResponse, dispatch]);

  // Set previous path for handle redirect when logged in
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
    handleMakeFriend,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalContext, useGlobalContext };

export default GlobalProvider;
