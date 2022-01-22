import { useState, useEffect } from 'react';

// types
import { Conversation } from '@/models/conversations';

// enums
import { Statuses } from '.';

import { useConversationsSelector, useUsersSelector } from '@/redux/selectors';
import { messagesApiClient } from '@/apis/messagesApi';
import { messengerActions } from '@/redux/slices/messengerSlice';
import useStoreDispatch from '@/hooks/useStoreDispatch';

import { Scrollbar } from '@/components/Scrollbar';
import ContactCard from './ContactCard';
import ContactEmptyList from './ContactEmptyList';

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
        return await getMessages({
          conversationId: conversation._id,
        });
      });

      const responses = await Promise.all(requests);

      responses.forEach((response) => {
        if (!response.success || response.messages.length === 0) return;

        dispatch(
          messengerActions.addLastMessage({ message: response.messages.pop()! })
        );
      });
    })();
  }, [stateConversations, dispatch]);

  // Set conversations by status
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
        setConversations(() => {
          const onlineConversations: Conversation[] = [];

          stateConversations.forEach((conversation) => {
            const isOnline = conversation.creators.some((creator) =>
              onlineUsers.some(
                (user) =>
                  user._id === creator._id && user._id !== currentUser._id
              )
            );

            if (isOnline) {
              const updatedCreators = conversation.creators.map((creator) => ({
                ...creator,
                isOnline: true,
              }));

              onlineConversations.push({
                ...conversation,
                creators: updatedCreators,
              });
            }
          });

          return onlineConversations;
        });
        break;
      default:
        break;
    }
  }, [currentUser, onlineUsers, stateConversations, status]);

  if (stateConversations.length === 0) {
    return (
      <ContactEmptyList message='Add a new friend to start a new conversation 💬' />
    );
  }

  if (status === Statuses.ONLINE && conversations.length === 0) {
    return (
      <ContactEmptyList message="Don't have any friends online right now 🙅" />
    );
  }

  if (status === Statuses.GROUPS || status === Statuses.ROOMS) {
    return <ContactEmptyList message='This feature is coming 🔨' />;
  }

  return (
    <Scrollbar dataAttr='data-contact-content-bottom'>
      {conversations?.map((conversation) => (
        <ContactCard key={conversation._id} conversation={conversation} />
      ))}
    </Scrollbar>
  );
}

export default ContactCardList;
