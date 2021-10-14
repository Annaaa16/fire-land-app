import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { authState$, conversationsState$ } from '@/redux/selectors';
import { getConversations } from '@/redux/actions/conversations';
import useMyDispatch from '@/hooks/useMyDispatch';

import ContactFriend from './ContactConversation';

function ContactConversationList() {
  const { currentUser } = useSelector(authState$);
  const { conversations } = useSelector(conversationsState$);

  return (
    <ul className='mt-7'>
      {conversations?.map((conversation) => (
        <ContactFriend
          key={conversation._id}
          userId={currentUser._id}
          conversation={conversation}
        />
      ))}
    </ul>
  );
}

export default ContactConversationList;
