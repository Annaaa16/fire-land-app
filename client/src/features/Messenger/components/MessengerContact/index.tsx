import { useState, useEffect } from 'react';

// clsx
import clsx from 'clsx';

// material ui icons
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import GroupsIcon from '@mui/icons-material/Groups';
import DoorFrontIcon from '@mui/icons-material/DoorFront';

import { conversationActions } from '@/redux/slices/conversationsSlice';
import { useUsersSelector } from '@/redux/selectors';
import useStoreDispatch from '@/hooks/useStoreDispatch';

import ContactCardList from './ContactCardList';
import ContactButton from './ContactButton';
import ContactHeader from './ContactHeader';
import ContactSearch from './ContactSearch';

export enum Statuses {
  CONVERSATIONS = 'conversations',
  ONLINE = 'online',
  GROUPS = 'groups',
  ROOMS = 'rooms',
}

function MessagesContact() {
  const { CONVERSATIONS, ONLINE, GROUPS, ROOMS } = Statuses;

  const { currentUser } = useUsersSelector();

  const [status, setStatus] = useState<Statuses>(CONVERSATIONS);

  const dispatch = useStoreDispatch();

  const handleSelectStatus = (status: Statuses) => {
    dispatch(conversationActions.setCurrentConversation(null));
    setStatus(status);
  };

  // Get conversations of current user
  useEffect(() => {
    if (!currentUser._id) return;

    dispatch(
      conversationActions.getConversationsRequest({
        userId: currentUser._id,
      })
    );
  }, [currentUser, dispatch]);

  return (
    <div
      className={clsx(
        'hidden lg:block w-[370px] h border-r border-lt-line dark:border-dk-line',
        'bg-white dark:bg-dk-cpn'
      )}>
      <div data-contact-content-top className={clsx('px-8 pt-10')}>
        <ContactHeader />
        <ContactSearch />

        <div
          className={clsx('flex items-center justify-center mt-6 space-x-3')}>
          <ContactButton
            onSelectStatus={() => handleSelectStatus(CONVERSATIONS)}
            active={status === CONVERSATIONS}
            icon={ChatBubbleIcon}
            tooltipTitle='Friends'
          />
          <ContactButton
            onSelectStatus={() => handleSelectStatus(ONLINE)}
            active={status === ONLINE}
            icon={PeopleAltIcon}
            tooltipTitle='Online'
          />
          <ContactButton
            onSelectStatus={() => handleSelectStatus(GROUPS)}
            active={status === GROUPS}
            icon={GroupsIcon}
            tooltipTitle='Groups'
          />
          <ContactButton
            onSelectStatus={() => handleSelectStatus(ROOMS)}
            active={status === ROOMS}
            icon={DoorFrontIcon}
            tooltipTitle='Rooms'
          />
        </div>
      </div>

      <ContactCardList status={status} />
    </div>
  );
}

export default MessagesContact;
