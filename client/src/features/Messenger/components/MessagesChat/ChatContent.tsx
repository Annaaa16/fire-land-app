// clsx
import clsx from 'clsx';

import User from '@/components/User';
import ChatFriend from './ChatFriend';
import ChatUser from './ChatUser';

function ChatContent() {
  return (
    <div
      className={clsx(
        'h-[100vh] pb-20 overflow-y-auto px-5 flex-1',
        'bg-lt-body dark:bg-dk-body'
      )}>
      <div className={clsx('flex items-end py-3')}>
        <User view='small' />
        <ChatFriend />
      </div>
      <div className={clsx('ml-auto py-3 justify-end')}>
        <ChatUser />
      </div>
    </div>
  );
}

export default ChatContent;
