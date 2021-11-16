import { useState, useEffect } from 'react';

// clsx
import clsx from 'clsx';

// material ui icons
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import GroupsIcon from '@mui/icons-material/Groups';

import { conversationsActions } from '@/redux/slices/conversationsSlice';
import { useUsersSelector } from '@/redux/selectors';
import useStoreDispatch from '@/hooks/useStoreDispatch';

import ContactConversationList from './ContactConversationList';
import ContactOnlineList from './ContactOnlineList';

enum Contacts {
  CONVERSATIONS,
  ONLINE,
  GROUPS,
}

function ContactContent() {
  const { CONVERSATIONS, ONLINE, GROUPS } = Contacts;

  const { currentUser } = useUsersSelector();

  const [contact, setContact] = useState<Contacts>(CONVERSATIONS);

  const dispatch = useStoreDispatch();

  // Get conversations of current user
  useEffect(() => {
    currentUser._id &&
      dispatch(conversationsActions.getConversationsRequest(currentUser._id));
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
          <SearchIcon className={clsx('text-lt-gray', 'cursor-pointer')} />
        </div>

        <div className={clsx('flex items-center justify-center mt-6')}>
          <button
            onClick={() => setContact(CONVERSATIONS)}
            className={clsx(
              'group flex-center min-w-[40px] min-h-[40px] rounded-full',
              'bg-primary-v1 dark:bg-primary-v4',
              'transition-all duration-300 ease-out',
              'hover:pl-5 hover:pr-18 hover:duration-[350ms]'
            )}>
            <ChatBubbleIcon className={clsx('!text-base', 'text-white')} />
            <span
              className={clsx(
                'font-bold invisible opacity-0 w-0',
                'text-white',
                'ease-out',
                'group-hover:visible group-hover:opacity-100 group-hover:ml-1 group-hover:duration-300'
              )}>
              Friends
            </span>
          </button>

          <button
            onClick={() => setContact(ONLINE)}
            className={clsx(
              'group flex-center min-w-[40px] min-h-[40px] rounded-full mx-4',
              'bg-gray-200 dark:bg-dk-tooltip dark:text-white',
              'transition-all duration-300 ease-out',
              'hover:pl-5 hover:pr-16 hover:bg-gray-300 hover:duration-[350ms]'
            )}>
            <PeopleAltIcon className={clsx('!text-lg')} />
            <span
              className={clsx(
                'font-bold invisible opacity-0 w-0',
                'ease-out',
                'group-hover:visible group-hover:opacity-100 group-hover:ml-1 group-hover:duration-300'
              )}>
              Online
            </span>
          </button>

          <button
            onClick={() => setContact(GROUPS)}
            className={clsx(
              'group flex-center min-w-[40px] min-h-[40px] rounded-full',
              'bg-gray-200 dark:bg-dk-tooltip dark:text-white',
              'transition-all duration-300 ease-out',
              'hover:pl-5 hover:pr-17 hover:bg-gray-300 hover:duration-[350ms]'
            )}>
            <GroupsIcon className={clsx('!text-xl')} />
            <span
              className={clsx(
                'font-bold invisible opacity-0 w-0',
                'ease-out',
                'group-hover:visible group-hover:opacity-100 group-hover:ml-1 group-hover:duration-300'
              )}>
              Groups
            </span>
          </button>
        </div>
      </div>

      {contact === CONVERSATIONS && <ContactConversationList />}
      {contact === ONLINE && <ContactOnlineList />}
      {/* <ContactOnlineList /> */}
    </>
  );
}

export default ContactContent;
