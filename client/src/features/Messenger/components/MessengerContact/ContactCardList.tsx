import { useState, useEffect } from 'react';

// types
import { Conversation } from '@/models/conversations';
import { GetMessagesResponse } from '@/models/messenger';

// enums
import { Statuses } from '.';

import { useConversationsSelector, useUsersSelector } from '@/redux/selectors';
import { messagesApiClient } from '@/apis/messagesApi';
import { messengerActions } from '@/redux/slices/messengerSlice';
import useStoreDispatch from '@/hooks/useStoreDispatch';

import { Scrollbar } from '@/components/Scrollbar';
import ContactCard from './ContactCard';

interface ContactCardListProps {
  status: Statuses;
}

function ContactCardList({ status }: ContactCardListProps) {
  const { conversations: stateConversations } = useConversationsSelector();
  const { currentUser, onlineUsers } = useUsersSelector();

  const [conversations, setConversations] = useState<Conversation[]>([]);

  const dispatch = useStoreDispatch();

  // Get last message from conversations
  useEffect(() => {
    (async () => {
      const { getMessages } = messagesApiClient();

      if (stateConversations.length === 0) return;

      const requests = stateConversations.map(async (conversation) => {
        return (await getMessages({
          conversationId: conversation._id,
        })) as GetMessagesResponse;
      });

      const responses = await Promise.all(requests);

      responses.forEach((data) => {
        if (!data.success || data.messages.length === 0) return;

        dispatch(
          messengerActions.addLastMessage({ message: data.messages.pop()! })
        );
      });
    })();
  }, [stateConversations, dispatch]);

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

  if (conversations.length === 0 || onlineUsers.length === 0) return null;

  return (
    <Scrollbar dataAttr='data-contact-content-bottom'>
      {conversations?.map((conversation) => (
        <ContactCard key={conversation._id} conversation={conversation} />
      ))}
    </Scrollbar>
  );
}

export default ContactCardList;
