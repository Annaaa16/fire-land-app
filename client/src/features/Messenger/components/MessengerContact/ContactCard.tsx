// clsx
import clsx from 'clsx';

// types
import { Conversation } from '@/models/conversations';

import { messengerActions } from '@/redux/slices/messengerSlice';
import { useConversationsSelector, useUsersSelector } from '@/redux/selectors';
import { conversationsActions } from '@/redux/slices/conversationsSlice';
import useStoreDispatch from '@/hooks/useStoreDispatch';
import useSocket from '@/hooks/useSocket';

import User from '@/components/User';

interface ContactCardProps {
  conversation: Conversation;
}

function ContactCard({ conversation }: ContactCardProps) {
  const { currentUser } = useUsersSelector();
  const { currentConversation } = useConversationsSelector();

  const { socketConversations } = useSocket();
  const dispatch = useStoreDispatch();

  const isSelected = currentConversation?._id === conversation._id;
  const friend = conversation.creators.filter(
    (user) => user._id !== currentUser._id
  )[0];

  const handleGetMessages = () => {
    dispatch(conversationsActions.setCurrentConversation(conversation));
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
        'flex items-center px-8 py-5',
        isSelected && 'border-l-[3px] border-primary-v1',
        isSelected ? 'bg-gray-100 dark:bg-dk-tooltip' : 'dark:bg-dk-cpn',
        'cursor-pointer'
      )}>
      <User view='sm' avatar={friend.avatar} online={friend.isOnline} rounded />
      <div className={clsx('ml-3 max-w-[60%]')}>
        <span className={clsx('font-semibold', 'dark:text-white')}>
          {friend.username}
        </span>
        <p
          className={clsx(
            'font-semibold text-xs mt-1 truncate',
            'text-primary-v1 dark:text-primary-v4'
          )}>
          Hi I am Josephin, can you help me to find best chat app?.
        </p>
      </div>
      <div className={clsx('ml-auto')}>
        <span className={clsx('text-xs', 'dark:text-white')}>10 min</span>
      </div>
    </li>
  );
}

export default ContactCard;
