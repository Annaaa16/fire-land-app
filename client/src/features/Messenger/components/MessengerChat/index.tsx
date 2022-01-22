// clsx
import clsx from 'clsx';

// material ui icons
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import { useConversationsSelector } from '@/redux/selectors';

import ChatHeader from './ChatHeader';
import ChatFooter from './ChatFooter';
import ChatContent from './ChatContent';

function MessagesChat() {
  const { currentConversation } = useConversationsSelector();

  return currentConversation ? (
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
    <div className={clsx('flex justify-center p-5')}>
      <ChatBubbleOutlineIcon
        className={clsx(
          'inline-block mr-2 !text-2xl',
          'text-gray-lt dark:text-gray-dk'
        )}
      />
      <h2
        className={clsx(
          'text-lg -translate-y-0.5',
          'text-gray-lt dark:text-gray-dk'
        )}>
        Let's start a new conversation
      </h2>
    </div>
  );
}

export default MessagesChat;
