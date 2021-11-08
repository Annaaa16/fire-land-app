import { useEffect } from 'react';

// clsx
import clsx from 'clsx';

// types
import { Message } from '@/models/messenger';

import { useMessengerSelector, useUsersSelector } from '@/redux/selectors';
import { addMessage } from '@/redux/slices/messengerSlice';
import useStoreDispatch from '@/hooks/useStoreDispatch';
import useSocket from '@/hooks/useSocket';

import ChatHeader from './ChatHeader';
import ChatFooter from './ChatFooter';
import ChatContent from './ChatContent';

function MessagesChat() {
  const { conversationId } = useMessengerSelector();
  const { currentUser } = useUsersSelector();

  const { socket } = useSocket();
  const dispatch = useStoreDispatch();

  // Get message from sender
  useEffect(() => {
    socket.on('getMessage', (data: Message) => {
      dispatch(
        addMessage({
          senderId: data.senderId,
          text: data.text,
          updatedAt: new Date().toISOString(),
        })
      );
    });
  }, [dispatch, socket]);

  // Send id to socket
  useEffect(() => {
    socket.emit('addUser', currentUser._id);
  }, [currentUser, socket]);

  return conversationId ? (
    <div
      className={clsx(
        'flex flex-col flex-grow flex-shrink-0 overflow-x-hidden',
        'bg-lt-body dark:bg-dk-body'
      )}>
      <ChatHeader />
      <ChatContent />
      <ChatFooter />
    </div>
  ) : (
    <div className={clsx('text-xl p-4')}>Nothing...</div>
  );
}

export default MessagesChat;
