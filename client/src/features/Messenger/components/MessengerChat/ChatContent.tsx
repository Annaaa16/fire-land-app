import { useRef, useLayoutEffect } from 'react';

// clsx
import clsx from 'clsx';

// nanoid
import { nanoid } from 'nanoid';

// react overlayscrollbars
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import { useMessengerSelector, useUsersSelector } from '@/redux/selectors';

import ChatFriend from './ChatFriend';
import ChatUser from './ChatUser';

function ChatContent() {
  const { messageContent } = useMessengerSelector();
  const { currentUser } = useUsersSelector();

  const scrollRef = useRef<OverlayScrollbarsComponent>(null);

  // Auto scroll to bottom
  useLayoutEffect(() => {
    const scrollNode = scrollRef.current?.osInstance()?.getElements('viewport');

    scrollNode.scrollTo({ top: scrollNode.scrollHeight, behavior: 'smooth' });
  }, [messageContent]);

  return (
    <OverlayScrollbarsComponent
      ref={scrollRef}
      options={{ scrollbars: { autoHide: 'scroll' } }}
      className={clsx('flex-1 pl-2 pr-4')}>
      {/* <User view='sm' /> */}
      {messageContent?.map(({ senderId, text }) =>
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
