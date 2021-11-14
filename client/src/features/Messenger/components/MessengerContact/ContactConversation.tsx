import { useEffect, useState } from 'react';

// clsx
import clsx from 'clsx';

// types
import { Conversation } from '@/models/conversations';
import { GetUserResponse } from '@/models/users';

import { messengerActions } from '@/redux/slices/messengerSlice';
import { usersApiClient } from '@/apis/usersApi';
import useStoreDispatch from '@/hooks/useStoreDispatch';

import User from '@/components/User';

interface ContactConversationProps {
  userId: string;
  conversation: Conversation;
}

function ContactConversation({
  userId,
  conversation,
}: ContactConversationProps) {
  const [friend, setFriend] = useState<GetUserResponse | null>(null);

  const dispatch = useStoreDispatch();

  const isActive = true;

  const handleGetMessages = () => {
    const receiverId = conversation.memberIds.find(
      (memberId) => memberId !== userId
    );

    dispatch(messengerActions.getMessagesRequest(conversation._id));
    dispatch(messengerActions.setConversationId(conversation._id));
    dispatch(messengerActions.setReceiverId(receiverId!));
  };

  // Fetch friend by friend ID
  useEffect(() => {
    const { getUser } = usersApiClient();

    const friendId = conversation.memberIds.find(
      (memberId: string) => memberId !== userId
    );

    (async () => {
      try {
        const response = await getUser(friendId!);

        setFriend(response!.data as GetUserResponse);
      } catch (error) {
        console.log('Get friend error 👉', error);
      }
    })();
  }, [conversation, userId]);

  return (
    <li
      onClick={handleGetMessages}
      className={clsx(
        'flex items-center px-8 py-5',
        isActive && 'border-l-[3px] border-primary-v1',
        isActive ? 'bg-gray-100 dark:bg-dk-tooltip-hv' : 'dark:bg-dk-cpn',
        'cursor-pointer'
      )}>
      <User view='sm' />
      <div className={clsx('ml-3 max-w-[60%]')}>
        <span className={clsx('font-bold', 'dark:text-white')}>
          {friend?.user.username}
        </span>
        <p
          className={clsx(
            'font-bold text-xs mt-1 truncate',
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

export default ContactConversation;
