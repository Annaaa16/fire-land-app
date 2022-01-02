// clsx
import clsx from 'clsx';

import { useMessengerSelector, useUsersSelector } from '@/redux/selectors';
import { messagePlaceholder } from '@/utils/text';

import { Scrollbar } from '@/components/Scrollbar';
import ChatFriend from './ChatFriend';
import ChatUser from './ChatUser';

function ChatContent() {
  const { messages } = useMessengerSelector();
  const { currentUser } = useUsersSelector();

  return (
    <>
      {messages.length > 0 ? (
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
      ) : (
        <p
          className={clsx('p-4 text-center', 'text-gray-lt dark:text-gray-dk')}>
          {messagePlaceholder}
        </p>
      )}
    </>
  );
}

export default ChatContent;
