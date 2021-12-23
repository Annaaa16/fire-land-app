import { useRef, useMemo } from 'react';

// types
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { Message, OnlineUser } from '@/models/messenger';
import { User } from '@/models/common';

import { EMITS, LISTENS } from '@/constants';
import { default as socketConfig } from '@/configs/socket';
import { messengerActions } from '@/redux/slices/messengerSlice';
import { userActions } from '@/redux/slices/usersSlice';
import useStoreDispatch from './useStoreDispatch';

const useSocket = () => {
  const socketRef = useRef<Socket<DefaultEventsMap>>(socketConfig);
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

      receiveMessage() {
        socket.on(LISTENS.RECEIVE_MESSAGE, (response: Message) => {
          dispatch(messengerActions.addMessage(response));
        });
      },
    }),
    [socket, dispatch]
  );

  const socketUsers = useMemo(
    () => ({
      addOnlineUser(currentUser: User) {
        socket.emit(EMITS.ADD_ONLINE_USER, currentUser);
      },

      receiveOnlineUsers() {
        socket.on(LISTENS.RECEIVE_ONLINE_USERS, (response: OnlineUser[]) => {
          dispatch(userActions.setOnlineUsers(response));
        });
      },
    }),
    [socket, dispatch]
  );

  return { socketConversations, socketUsers };
};

export default useSocket;
