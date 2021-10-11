import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { authState$, conversationsState$ } from '@/redux/selectors';
import { getConversations } from '@/redux/actions/conversations';
import useMyDispatch from '@/hooks/useMyDispatch';

import ContactFriend from './ContactFriend';

function ContactFriendList() {
  const { currentUser } = useSelector(authState$);
  const { conversations } = useSelector(conversationsState$);

  const dispatch = useMyDispatch();

  // Set conversations first mount
  useEffect(() => {
    dispatch(getConversations.request(currentUser.id));
  }, [currentUser, dispatch]);

  return (
    <ul className='mt-7'>
      {conversations?.map((conversation) => (
        <ContactFriend
          key={conversation._id}
          userId={currentUser.id}
          conversation={conversation}
        />
      ))}
    </ul>
  );
}

export default ContactFriendList;
