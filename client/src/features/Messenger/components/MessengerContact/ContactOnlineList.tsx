import { useEffect, useState } from 'react';

// types
import { OnlineUser } from '@/models/messenger';

import { useUsersSelector } from '@/redux/selectors';
import useSocket from '@/hooks/useSocket';

import ContactOnline from './ContactOnline';

function ContactOnlineList() {
  const { currentUser } = useUsersSelector();

  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);

  const { socket } = useSocket();

  // Get online users
  useEffect(() => {
    socket.on('getUsers', (users) => {
      setOnlineUsers(users);
    });
  }, [socket]);

  return (
    <ul className='mt-7'>
      {onlineUsers.map(
        (user) =>
          currentUser.followings.includes(user.userId) && (
            <ContactOnline key={user.userId} friendId={user.userId} />
          )
      )}
    </ul>
  );
}

export default ContactOnlineList;
