import { createContext, useContext, useEffect } from 'react';

import { useRef, useMemo } from 'react';
import { nanoid } from '@reduxjs/toolkit';

// types
import { SocketEvents } from '@/models/socket';
import { Message, OnlineUser } from '@/models/messenger';
import { User } from '@/models/common';
import { SocketNotification } from '@/models/common';
import { ReactNode } from 'react';
import { SocketInitContext } from '@/models/app';

import { EMITS, LISTENS } from '../configs/socket';
import { default as socketConfig } from '@/configs/socket';
import { messengerActions } from '@/redux/slices/messengerSlice';
import { userActions } from '@/redux/slices/usersSlice';
import { notificationActions } from '@/redux/slices/notificationsSlice';
import { useAuthSelector, useUsersSelector } from '@/redux/selectors';
import useStoreDispatch from '@/hooks/useStoreDispatch';
import time from '@/helpers/time';

interface SocketProviderProps {
  children: ReactNode;
}

const initState: SocketInitContext = {
  socketConversations: {
    joinConversation: () => {},
    leaveConversation: () => {},
    sendMessage: () => {},
  },
  socketUsers: {
    addOnlineUser: () => {},
  },
  socketNotifications: {
    sendNotification: () => {},
  },
};

const SocketContext = createContext(initState);

function SocketProvider({ children }: SocketProviderProps) {
  const { currentUser } = useUsersSelector();
  const { isAuthenticated } = useAuthSelector();

  const socketRef = useRef<SocketEvents>(socketConfig);
  const socket = socketRef.current;

  const dispatch = useStoreDispatch();

  const socketConversations = useMemo(
    () => ({
      joinConversation(payload: { user: User; conversationId: string }) {
        socket.emit(EMITS.JOIN_CONVERSATION, payload);
      },

      leaveConversation() {
        socket.emit(EMITS.LEAVE_CONVERSATION);
      },

      sendMessage(text: string) {
        socket.emit(EMITS.SEND_MESSAGE, text);
      },
    }),
    [socket]
  );

  const socketUsers = useMemo(
    () => ({
      addOnlineUser(currentUser: User) {
        socket.emit(EMITS.ADD_ONLINE_USER, currentUser);
      },
    }),
    [socket]
  );

  const socketNotifications = useMemo(
    () => ({
      sendNotification(content: string) {
        socket.emit(EMITS.SEND_NOTIFICATION, {
          id: nanoid(20),
          content,
          user: currentUser,
          createdAt: time.getNow(),
        });
      },
    }),
    [socket, currentUser]
  );

  useEffect(() => {
    if (!isAuthenticated) return;

    socketUsers.addOnlineUser(currentUser);
  }, [socketUsers, isAuthenticated, currentUser]);

  useEffect(() => {
    // Auto get message from sender
    socket.on(LISTENS.RECEIVE_MESSAGE, (response: Message) => {
      dispatch(messengerActions.addMessage(response));
    });

    // Auto set online users
    socket.on(LISTENS.RECEIVE_ONLINE_USERS, (response: OnlineUser[]) => {
      dispatch(userActions.setOnlineUsers(response));
    });

    // Auto receive notification
    socket.on(LISTENS.RECEIVE_NOTIFICATION, (response: SocketNotification) => {
      dispatch(notificationActions.addNotification(response));
    });
  }, [socket, dispatch]);

  const value = { socketConversations, socketUsers, socketNotifications };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}

export const useSocketContext = () => useContext(SocketContext);

export default SocketProvider;
