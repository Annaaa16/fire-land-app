import { useRef, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';

// clsx
import clsx from 'clsx';

// nanoid
import { nanoid } from 'nanoid';

// react overlayscrollbars
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import { authState$, messengerState$ } from '@/redux/selectors';

import ChatFriend from './ChatFriend';
import ChatUser from './ChatUser';

function ChatContent() {
  const { currentChat } = useSelector(messengerState$);
  const { currentUser } = useSelector(authState$);

  const scrollRef = useRef<OverlayScrollbarsComponent>(null);

  // Auto scroll to bottom
  useLayoutEffect(() => {
    const scrollNode = scrollRef.current?.osInstance()?.getElements('viewport');

    scrollNode.scrollTo({ top: scrollNode.scrollHeight, behavior: 'smooth' });
  }, [currentChat]);

  return (
    <OverlayScrollbarsComponent
      ref={scrollRef}
      options={{ scrollbars: { autoHide: 'scroll' } }}
      className={clsx('flex-1 pl-2 pr-4')}>
      {/* <User view='small' /> */}
      {currentChat?.map(({ senderId, text }) =>
        senderId !== currentUser._id ? (
          <ChatFriend key={nanoid(6)} message={text} />
        ) : (
          <ChatUser key={nanoid(6)} message={text} />
        )
      )}
    </OverlayScrollbarsComponent>
  );
}

export default ChatContent;
