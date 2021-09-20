// clsx
import clsx from 'clsx';

import ChatHeader from './ChatHeader';
import ChatFooter from './ChatFooter';
import ChatContent from './ChatContent';

function MessagesChat() {
  return (
    <div
      className={clsx(
        'relative',
        'flex flex-col flex-1 h-screen',
        'bg-lt-body dark:bg-dk-body'
      )}>
      <ChatHeader />
      <ChatContent />
      <ChatFooter />
    </div>
  );
}

export default MessagesChat;
