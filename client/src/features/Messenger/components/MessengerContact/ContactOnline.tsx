import { useEffect, useState } from 'react';

// clsx
import clsx from 'clsx';

// types
import { User as UserType } from '@/models/common';
import { AxiosResponse } from 'axios';
import { GetUserResponse } from '@/models/users';

import { useConversationsSelector } from '@/redux/selectors';
import { usersApiClient } from '@/apis/usersApi';
import { getMessages } from '@/redux/actions/messenger';
import useStoreDispatch from '@/hooks/useStoreDispatch';
import {
  setConversationId,
  setReceiverId,
} from '@/redux/slices/messengerSlice';

import User from '@/components/User';

interface ContactOnlineProps {
  friendId: string;
}

function ContactOnline(props: ContactOnlineProps) {
  const { friendId } = props;

  const { conversations } = useConversationsSelector();

  const [onlineFriend, setOnlineFriend] = useState<UserType | null>(null);

  const dispatch = useStoreDispatch();

  const handleGetMessages = () => {
    const conversation = conversations.find((conv) =>
      conv.memberIds.some((id) => id === onlineFriend?._id)
    );

    dispatch(getMessages.request({ conversationId: conversation!._id }));
    dispatch(setConversationId(conversation!._id));
    dispatch(setReceiverId(onlineFriend!._id));
  };

  // Fetch online friend by friend ID
  useEffect(() => {
    const { getUserById } = usersApiClient();

    (async () => {
      try {
        const response = (await getUserById(
          friendId!
        )) as AxiosResponse<GetUserResponse>;

        setOnlineFriend(response!.data.user);
      } catch (error) {
        console.log('Get online friend error 👉', error);
      }
    })();
  }, [friendId]);

  return (
    <li
      onClick={handleGetMessages}
      className={clsx(
        'flex items-center px-8 py-5',
        'dark:bg-dk-cpn',
        'cursor-pointer'
      )}>
      <User view='sm' />
      <div className={clsx('ml-3 max-w-[60%]')}>
        <span className={clsx('font-bold', 'dark:text-white')}>
          {onlineFriend?.username}
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

export default ContactOnline;
