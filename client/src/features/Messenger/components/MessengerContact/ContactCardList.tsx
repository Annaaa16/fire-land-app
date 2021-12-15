import { useState, useEffect } from 'react';

// types
import { Conversation } from '@/models/conversations';

// enums
import { Statuses } from './ContactContent';

import { useConversationsSelector, useUsersSelector } from '@/redux/selectors';

import ContactCard from './ContactCard';

interface ContactCardListProps {
  status: Statuses;
}

function ContactCardList({ status }: ContactCardListProps) {
  const { conversations: stateConversations } = useConversationsSelector();
  const { currentUser, onlineUsers } = useUsersSelector();

  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const { CONVERSATIONS, ONLINE } = Statuses;

    switch (status) {
      case CONVERSATIONS:
        setConversations(() =>
          stateConversations.map((conversation) => {
            const updatedCreators = conversation.creators.map((creator) => {
              const isOnline = onlineUsers.some(
                (user) =>
                  user._id === creator._id && user._id !== currentUser._id
              );

              return {
                ...creator,
                isOnline,
              };
            });

            return { ...conversation, creators: updatedCreators };
          })
        );
        break;
      case ONLINE:
        setConversations((prevState) => {
          if (onlineUsers.length === 0) return prevState;

          return prevState.filter((conversation) =>
            conversation.creators.some(
              (creator) => creator.isOnline && creator._id !== currentUser._id
            )
          );
        });
        break;
      default:
        break;
    }
  }, [currentUser, onlineUsers, stateConversations, status]);

  if (conversations.length === 0) return null;

  return (
    <ul className='mt-7'>
      {conversations?.map((conversation) => (
        <ContactCard key={conversation._id} conversation={conversation} />
      ))}
    </ul>
  );
}

export default ContactCardList;
