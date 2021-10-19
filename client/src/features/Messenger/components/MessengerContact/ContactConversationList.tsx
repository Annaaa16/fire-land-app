import { useConversationsSelector, useUsersSelector } from '@/redux/selectors';

import ContactFriend from './ContactConversation';

function ContactConversationList() {
  const { currentUser } = useUsersSelector();
  const { conversations } = useConversationsSelector();

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
