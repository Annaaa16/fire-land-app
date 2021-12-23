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

import Tooltip from '@/components/Tooltip';
import ContactCardList from './ContactCardList';

export enum Statuses {
  CONVERSATIONS = 'conversations',
  ONLINE = 'online',
  GROUPS = 'groups',
  ROOMS = 'rooms',
}

function ContactContent() {
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
    <>
      <div className={clsx('mt-5 px-8')}>
        <div
          className={clsx(
            'flex items-center rounded-full px-3',
            'bg-lt-input dark:text-white dark:bg-dk-input'
          )}>
          <input
            placeholder='Search Messenger'
            className={clsx('flex-1 outline-none px-2 py-3', 'bg-transparent')}
          />
          <SearchIcon className={clsx('text-gray-lt', 'cursor-pointer')} />
        </div>

        <div
          className={clsx('flex items-center justify-center mt-6 space-x-3')}>
          <button
            onClick={() => handleSelectStatus(CONVERSATIONS)}
            className={clsx(
              'relative',
              'group flex-center min-w-[40px] min-h-[40px] rounded-full',
              status === CONVERSATIONS
                ? 'bg-primary-v1 dark:bg-primary-v4'
                : 'bg-gray-200 dark:bg-dk-tooltip',
              'transition-all duration-300 ease-out',
              status === CONVERSATIONS
                ? 'dark:hover:bg-primary-v4-hv'
                : 'hover:bg-gray-300 dark:hover:bg-gray-700'
            )}>
            <ChatBubbleIcon
              className={clsx(
                '!text-base',
                'dark:text-white',
                status === CONVERSATIONS && 'text-white',
                '!transition-none'
              )}
            />
            <Tooltip title='Friends' direction='btt' />
          </button>

          <button
            onClick={() => handleSelectStatus(ONLINE)}
            className={clsx(
              'relative',
              'group flex-center min-w-[40px] min-h-[40px] rounded-full',
              status === ONLINE
                ? 'bg-primary-v1 dark:bg-primary-v4'
                : 'bg-gray-200 dark:bg-dk-tooltip',
              'transition-all duration-300 ease-out',
              status === ONLINE
                ? 'dark:hover:bg-primary-v4-hv'
                : 'hover:bg-gray-300 dark:hover:bg-gray-700'
            )}>
            <PeopleAltIcon
              className={clsx(
                '!text-lg',
                'dark:text-white',
                status === ONLINE && 'text-white',
                '!transition-none'
              )}
            />
            <Tooltip title='Online' direction='btt' />
          </button>

          <button
            onClick={() => handleSelectStatus(GROUPS)}
            className={clsx(
              'relative',
              'group flex-center min-w-[40px] min-h-[40px] rounded-full',
              status === GROUPS
                ? 'bg-primary-v1 dark:bg-primary-v4'
                : 'bg-gray-200 dark:bg-dk-tooltip',
              'transition-all duration-300 ease-out',
              status === GROUPS
                ? 'dark:hover:bg-primary-v4-hv'
                : 'hover:bg-gray-300 dark:hover:bg-gray-700'
            )}>
            <GroupsIcon
              className={clsx(
                '!text-xl',
                'dark:text-white',
                status === GROUPS && 'text-white',
                '!transition-none'
              )}
            />
            <Tooltip title='Groups' direction='btt' />
          </button>

          <button
            onClick={() => handleSelectStatus(ROOMS)}
            className={clsx(
              'relative',
              'group flex-center min-w-[40px] min-h-[40px] rounded-full',
              status === ROOMS
                ? 'bg-primary-v1 dark:bg-primary-v4'
                : 'bg-gray-200 dark:bg-dk-tooltip',
              'transition-all duration-300 ease-out',
              status === ROOMS
                ? 'dark:hover:bg-primary-v4-hv'
                : 'hover:bg-gray-300 dark:hover:bg-gray-700'
            )}>
            <DoorFrontIcon
              className={clsx(
                '!text-xl',
                'dark:text-white',
                status === ROOMS && 'text-white',
                '!transition-none'
              )}
            />
            <Tooltip title='Rooms' direction='btt' />
          </button>
        </div>
      </div>

      <ContactCardList status={status} />
    </>
  );
}

export default ContactContent;
