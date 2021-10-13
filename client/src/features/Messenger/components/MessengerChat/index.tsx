import { useEffect } from 'react';
import { useSelector } from 'react-redux';

// clsx
import clsx from 'clsx';

// types
import { Message } from '@/models/messenger';

import { authState$, messengerState$ } from '@/redux/selectors';
import { addMessage } from '@/redux/slices/messengerSlice';
import useMyDispatch from '@/hooks/useMyDispatch';
import useSocket from '@/hooks/useSocket';

import ChatHeader from './ChatHeader';
import ChatFooter from './ChatFooter';
import ChatContent from './ChatContent';

function MessagesChat() {
  const { currentChat } = useSelector(messengerState$);
  const { currentUser } = useSelector(authState$);

  const { socket } = useSocket();
  const dispatch = useMyDispatch();

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

  return currentChat?.length > 0 ? (
    <div
      className={clsx(
        'flex flex-col flex-grow overflow-x-hidden',
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
