import { useMessengerSelector, useUsersSelector } from '@/redux/selectors';

import { Scrollbar } from '@/components/Scrollbar';
import ChatFriend from './ChatFriend';
import ChatUser from './ChatUser';

function ChatContent() {
  const { messages } = useMessengerSelector();
  const { currentUser } = useUsersSelector();

  return (
    <Scrollbar scrollToBottom>
      <div className='pr-4'>
        {messages?.map(({ user, text }, idx) =>
          user._id !== currentUser._id ? (
            <ChatFriend key={'chat-friend' + idx} message={text} />
          ) : (
            <ChatUser key={'chat-user' + idx} message={text} />
          )
        )}
      </div>
    </Scrollbar>
  );
}

export default ChatContent;
