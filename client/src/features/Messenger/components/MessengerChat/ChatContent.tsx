import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

// clsx
import clsx from 'clsx';

// nanoid
import { nanoid } from 'nanoid';

import { authState$, messengerState$ } from '@/redux/selectors';

import ChatFriend from './ChatFriend';
import ChatUser from './ChatUser';

function ChatContent() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { currentChat } = useSelector(messengerState$);
  const { currentUser } = useSelector(authState$);

  useEffect(() => {
    scrollRef.current!.scrollTo({
      top: scrollRef.current!.scrollHeight,
      behavior: 'smooth',
    });
  }, [currentChat]);

  return (
    <div
      ref={scrollRef}
      className={clsx(
        'pt-20 pb-20 overflow-y-auto px-5',
        'bg-lt-body dark:bg-dk-body'
      )}>
      {/* <User view='small' /> */}
      {currentChat?.map(({ senderId, text }, idx) =>
        senderId !== currentUser.id ? (
          <div key={nanoid(6)} className={clsx('flex items-end')}>
            <ChatFriend message={text} />
          </div>
        ) : (
          <div key={nanoid(6)} className={clsx('ml-auto justify-end')}>
            <ChatUser message={text} />
          </div>
        )
      )}
    </div>
  );
}

export default ChatContent;
