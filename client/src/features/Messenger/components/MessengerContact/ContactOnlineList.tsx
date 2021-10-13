import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// types
import { OnlineUser } from '@/models/messenger';

import { authState$ } from '@/redux/selectors';
import useSocket from '@/hooks/useSocket';

import ContactOnline from './ContactOnline';

function ContactOnlineList() {
  const { currentUser } = useSelector(authState$);

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
            <ContactOnline friendId={user.userId} />
          )
      )}
    </ul>
  );
}

export default ContactOnlineList;
