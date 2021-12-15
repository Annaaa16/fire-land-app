import { useRef } from 'react';

// clsx
import clsx from 'clsx';

// nanoid
import { nanoid } from 'nanoid';

// react overlayscrollbars
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import { useMessengerSelector, useUsersSelector } from '@/redux/selectors';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect ';

import ChatFriend from './ChatFriend';
import ChatUser from './ChatUser';

function ChatContent() {
  const { messages } = useMessengerSelector();
  const { currentUser } = useUsersSelector();

  const scrollRef = useRef<OverlayScrollbarsComponent>(null);

  // Auto scroll to bottom
  useIsomorphicLayoutEffect(() => {
    const scrollNode = scrollRef.current?.osInstance()?.getElements('viewport');

    scrollNode?.scrollTo({ top: scrollNode.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  return (
    <OverlayScrollbarsComponent
      ref={scrollRef}
      className={clsx('flex-1 pl-2 pr-4')}>
      {/* <User view='sm' /> */}
      {messages?.map(({ user, text }) =>
        user._id !== currentUser._id ? (
          <ChatFriend key={nanoid(6)} message={text} />
        ) : (
          <ChatUser key={nanoid(6)} message={text} />
        )
      )}
    </OverlayScrollbarsComponent>
  );
}

export default ChatContent;
