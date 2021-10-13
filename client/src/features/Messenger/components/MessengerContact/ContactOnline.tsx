import { useEffect, useState } from 'react';

// clsx
import clsx from 'clsx';

// types
import { AxiosResponse } from 'axios';
import { GetUserResponse } from '@/models/auth';
import { User as UserType } from '@/models/common';

import { authApiClient } from '@/apis/authApi';

import User from '@/components/User';

interface ContactOnlineProps {
  friendId: string;
}

function ContactOnline(props: ContactOnlineProps) {
  const { friendId } = props;

  const [onlineFriend, setOnlineFriend] = useState<UserType | null>(null);

  // Fetch online friend by friend ID
  useEffect(() => {
    const { reqGetUserById } = authApiClient();

    (async () => {
      try {
        const response = (await reqGetUserById(
          friendId!
        )) as AxiosResponse<GetUserResponse>;

        setOnlineFriend(response.data.user);
      } catch (error) {
        console.log('Get online friend error 👉', error);
      }
    })();
  }, [friendId]);

  return (
    <li
      className={clsx(
        'flex items-center px-8 py-5',
        'dark:bg-dk-cpn',
        'cursor-pointer'
      )}>
      <User view='small' />
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
