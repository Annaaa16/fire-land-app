// clsx
import clsx from 'clsx';

import { useConversationsSelector } from '@/redux/selectors';

import ChatHeader from './ChatHeader';
import ChatFooter from './ChatFooter';
import ChatContent from './ChatContent';

function MessagesChat() {
  const { currentConversation } = useConversationsSelector();

  return currentConversation ? (
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
