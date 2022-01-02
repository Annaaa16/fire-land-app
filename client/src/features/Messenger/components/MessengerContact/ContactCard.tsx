// clsx
import clsx from 'clsx';

// react timeago
import Timeago from 'react-timeago';

// types
import { Conversation } from '@/models/conversations';

import {
  useConversationsSelector,
  useMessengerSelector,
  useUsersSelector,
} from '@/redux/selectors';
import { conversationActions } from '@/redux/slices/conversationsSlice';
import { useSocketContext } from '@/contexts/SocketContext';
import { messengerActions } from '@/redux/slices/messengerSlice';
import { messagePlaceholder } from '@/utils/text';
import useStoreDispatch from '@/hooks/useStoreDispatch';

import User from '@/components/User';

interface ContactCardProps {
  conversation: Conversation;
}

function ContactCard({ conversation }: ContactCardProps) {
  const { currentUser } = useUsersSelector();
  const { currentConversation } = useConversationsSelector();
  const { lastMessages } = useMessengerSelector();

  const { socketConversations } = useSocketContext();
  const dispatch = useStoreDispatch();

  const isSelected = currentConversation?._id === conversation._id;
  const friend = conversation.creators.filter(
    (user) => user._id !== currentUser._id
  )[0];
  const lastMessage = lastMessages.find(
    (message) => message.conversationId === conversation._id
  );
  const message = lastMessage?.text || messagePlaceholder;

  const handleGetMessages = () => {
    dispatch(conversationActions.setCurrentConversation(conversation));
    dispatch(messengerActions.setConversationId(conversation._id));
    dispatch(
      messengerActions.getMessagesRequest({ conversationId: conversation._id })
    );

    socketConversations.leaveConversation();
    socketConversations.joinConversation({
      user: currentUser,
      conversationId: conversation._id,
    });
  };

  return (
    <li
      onClick={handleGetMessages}
      className={clsx(
        'relative',
        'flex items-center px-6 py-5',
        'cursor-pointer',
        isSelected ? 'bg-gray-100 dark:bg-dk-tooltip' : 'dark:bg-dk-cpn'
      )}>
      <User
        className='mr-3'
        view='sm'
        avatar={friend.avatar}
        online={friend.isOnline}
        rounded
      />
      <div className='overflow-hidden whitespace-nowrap'>
        <div className={clsx('font-semibold truncate', 'dark:text-white')}>
          {friend.username}
        </div>
        <abbr
          title={message}
          className={clsx(
            'font-semibold text-xs mt-1 truncate',
            lastMessage?.text
              ? 'text-primary-v1 dark:text-primary-v4'
              : 'text-gray-lt dark:text-gray-dk'
          )}>
          {message}
        </abbr>
      </div>
      <Timeago
        live={false}
        date={lastMessage?.createdAt || ''}
        className={clsx('ml-auto text-xs whitespace-nowrap', 'dark:text-white')}
      />
      {isSelected && (
        <div
          className={clsx(
            'absolute left-0 top-0',
            'w-[3px] h-full',
            'bg-primary-v1'
          )}
        />
      )}
    </li>
  );
}

export default ContactCard;
