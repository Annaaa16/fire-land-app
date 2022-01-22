import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { nanoid } from '@reduxjs/toolkit';

// types
import { SocketEvents } from '@/models/socket';
import { Message, OnlineUser } from '@/models/messenger';
import { User } from '@/models/common';
import { SocketNotification } from '@/models/common';
import { ReactNode } from 'react';
import { SocketInitContext } from '@/models/app';

import createSocket, { EMITS, LISTENS } from '../configs/socket';
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
  socketNotifications: {
    sendNotification: () => {},
  },
};

const SocketContext = createContext(initState);

function SocketProvider({ children }: SocketProviderProps) {
  const { currentUser } = useUsersSelector();
  const { isAuthenticated } = useAuthSelector();

  const [socket, setSocket] = useState<SocketEvents | null>(null);

  const dispatch = useStoreDispatch();

  const socketConversations = useMemo(
    () => ({
      joinConversation(payload: { user: User; conversationId: string }) {
        socket?.emit(EMITS.JOIN_CONVERSATION, payload);
      },

      leaveConversation() {
        socket?.emit(EMITS.LEAVE_CONVERSATION);
      },

      sendMessage(text: string) {
        socket?.emit(EMITS.SEND_MESSAGE, text);
      },
    }),
    [socket]
  );

  const socketNotifications = useMemo(
    () => ({
      sendNotification(content: string) {
        socket?.emit(EMITS.SEND_NOTIFICATION, {
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
    if (!currentUser._id) return;

    setSocket(
      createSocket({
        withCredentials: true,
        query: {
          userId: currentUser._id,
        },
      })
    );
  }, [currentUser._id]);

  useEffect(() => {
    if (!isAuthenticated || !socket) return;

    socket.emit(EMITS.ADD_ONLINE_USER, currentUser);
  }, [isAuthenticated, currentUser, socket]);

  useEffect(() => {
    if (!socket) return;

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

    return () => {
      socket.close();
    };
  }, [socket, dispatch]);

  const value = { socketConversations, socketNotifications };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}

export const useSocketContext = () => useContext(SocketContext);

export default SocketProvider;
